-- Migration: Core RLS Policies (Pattern A) using public.users as profile table
-- Description: Adds non-recursive helper functions and applies tenant isolation to core tables.

BEGIN;

-- Helper: get current user's school_id from public.users (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.get_my_school_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT u.school_id
  FROM public.users u
  WHERE u.id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_school_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    WHERE u.id = auth.uid()
      AND lower(u.role) IN ('admin', 'proprietor', 'super_admin')
  );
$$;

-- CORE TABLE: public.users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_self_select" ON public.users;
CREATE POLICY "users_self_select" ON public.users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "users_admin_select_school" ON public.users;
CREATE POLICY "users_admin_select_school" ON public.users
  FOR SELECT TO authenticated
  USING (
    public.is_school_admin()
    AND school_id = public.get_my_school_id()
  );

DROP POLICY IF EXISTS "users_admin_insert_school" ON public.users;
CREATE POLICY "users_admin_insert_school" ON public.users
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_school_admin()
    AND school_id = public.get_my_school_id()
  );

DROP POLICY IF EXISTS "users_admin_update_school" ON public.users;
CREATE POLICY "users_admin_update_school" ON public.users
  FOR UPDATE TO authenticated
  USING (
    public.is_school_admin()
    AND school_id = public.get_my_school_id()
  )
  WITH CHECK (
    public.is_school_admin()
    AND school_id = public.get_my_school_id()
  );

-- GENERIC TENANT ISOLATION (tables with school_id)
DO $$
DECLARE
  t text;
  stmt text;
BEGIN
  FOREACH t IN ARRAY ARRAY['students','teachers','parents','classes','branches']
  LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

      -- Drop and re-create a single canonical tenant policy for ALL
      EXECUTE format('DROP POLICY IF EXISTS %L ON public.%I', t || '_tenant_isolation', t);
      stmt := format(
        'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (school_id = public.get_my_school_id()) WITH CHECK (school_id = public.get_my_school_id())',
        t || '_tenant_isolation',
        t
      );
      EXECUTE stmt;
    END IF;
  END LOOP;
END $$;

-- Schools should be readable (login page, branding, etc.). Keep it simple.
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "schools_select_any" ON public.schools;
CREATE POLICY "schools_select_any" ON public.schools
  FOR SELECT TO authenticated, anon
  USING (true);

COMMIT;
