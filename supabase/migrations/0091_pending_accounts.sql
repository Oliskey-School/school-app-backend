-- Migration: Pending Accounts for Admin Approval Flow
-- Description: Adds pending_accounts table for teacher/admin requested users and approval workflow.

BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pending_account_status') THEN
    CREATE TYPE public.pending_account_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.pending_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  branch_id UUID NULL REFERENCES public.branches(id) ON DELETE SET NULL,

  role TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,

  requested_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  status public.pending_account_status NOT NULL DEFAULT 'pending',

  class_id UUID NULL REFERENCES public.classes(id) ON DELETE SET NULL,

  approved_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Avoid duplicate pending rows for same email/role within same school
CREATE UNIQUE INDEX IF NOT EXISTS idx_pending_accounts_unique_school_email_role
  ON public.pending_accounts (school_id, lower(email), lower(role))
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_pending_accounts_school_id ON public.pending_accounts (school_id);
CREATE INDEX IF NOT EXISTS idx_pending_accounts_status ON public.pending_accounts (status);

ALTER TABLE public.pending_accounts ENABLE ROW LEVEL SECURITY;

-- Pattern A: tenant isolation via EXISTS subquery on public.users keyed by auth.uid()
DROP POLICY IF EXISTS "pending_accounts_tenant_select" ON public.pending_accounts;
CREATE POLICY "pending_accounts_tenant_select"
  ON public.pending_accounts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.users u
      WHERE u.id = auth.uid()
        AND u.school_id = pending_accounts.school_id
        AND u.role IN ('admin', 'proprietor', 'super_admin', 'teacher')
    )
  );

DROP POLICY IF EXISTS "pending_accounts_teacher_admin_insert" ON public.pending_accounts;
CREATE POLICY "pending_accounts_teacher_admin_insert"
  ON public.pending_accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.users u
      WHERE u.id = auth.uid()
        AND u.school_id = pending_accounts.school_id
        AND u.role IN ('admin', 'proprietor', 'super_admin', 'teacher')
    )
  );

DROP POLICY IF EXISTS "pending_accounts_admin_update" ON public.pending_accounts;
CREATE POLICY "pending_accounts_admin_update"
  ON public.pending_accounts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.users u
      WHERE u.id = auth.uid()
        AND u.school_id = pending_accounts.school_id
        AND u.role IN ('admin', 'proprietor', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.users u
      WHERE u.id = auth.uid()
        AND u.school_id = pending_accounts.school_id
        AND u.role IN ('admin', 'proprietor', 'super_admin')
    )
  );

COMMIT;
