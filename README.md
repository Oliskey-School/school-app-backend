# School App Backend

This repository contains the backend logic, database migrations, and Supabase configuration for the School App.

## Current Progress (Implemented)
1. **Supabase Auth integration**
    - **Anon-key** client for public auth flows (email OTP/link signup).
    - **Service-role** client for privileged provisioning (admin approval flow).
2. **School owner signup (email verification / OTP-link)**
    - `POST /api/auth/school-signup` creates a Supabase Auth user and stores onboarding metadata.
    - Database onboarding runs via existing Supabase migration triggers.
3. **Pending accounts (approval flow)**
    - Migration creates `pending_accounts` + RLS policies.
    - API endpoints for creating/listing/approving pending users.
4. **Auth middleware**
    - Validates Supabase JWT.
    - Loads profile from `public.users` (fallback to `public.profiles` if present).
5. **RLS consolidation (in progress)**
    - Pattern A draft migration exists: `supabase/migrations/0092_rls_pattern_a_core.sql`.

## Directory Structure
- `supabase/migrations`: Database schema changes.
- `supabase/functions`: Edge functions.
- `supabase/seed.sql`: Seed data.

## API Base Paths
- **Base API**: `/api`
- **Auth**: `/api/auth/*`
- **Pending Accounts**: `/api/pending-accounts/*`

## Key Endpoints
- **Health**
    - `GET /` -> `{ status: 'ok' }`
- **Auth**
    - `POST /api/auth/school-signup`
    - `POST /api/auth/signup`
    - `POST /api/auth/login`
    - `POST /api/auth/create-user`
    - `GET /api/auth/verify` (requires `Authorization: Bearer <access_token>`)
    - `GET /api/auth/me` (requires `Authorization: Bearer <access_token>`)
- **Pending accounts**
    - `POST /api/pending-accounts` (requires auth)
    - `GET /api/pending-accounts` (requires auth)
    - `POST /api/pending-accounts/:id/approve` (requires auth + admin/owner role)

## Deployment Instructions

1.  **Environment Setup**:
    -   Copy `.env.local` to `.env`.
    -   Ensure these are set:
        - `SUPABASE_URL`
        - `SUPABASE_ANON_KEY`
        - `SUPABASE_SERVICE_KEY`
        - `JWT_SECRET`
        - `PORT` (optional)

2.  **Database Migration**:
    -   We have consolidated migrations 0050-0066 into `0050_baseline_migration.sql`.
    -   Run `supabase db push` to apply changes.

3.  **Critical Fixes**:
    -   Run `fix_critical_bugs.sql` immediately after deployment to resolve known security and performance issues (554 items) and fix the `users_pkey` sequence error.
    -   Command: `psql -h ... -f fix_critical_bugs.sql`

## Frontend Connection Guide

### 1) Frontend env vars
Add the **Supabase public settings** to your frontend environment:
- **`SUPABASE_URL`**
- **`SUPABASE_ANON_KEY`**

Do **not** add `SUPABASE_SERVICE_KEY` to the frontend.

### 2) Create the Supabase client in the frontend
Use `@supabase/supabase-js` with the **anon key**.

### 3) Auth flow (how it should work)
1. **School owner signup**
    - Call your backend: `POST {BACKEND_URL}/api/auth/school-signup`
    - Backend uses Supabase **anon key** to create the auth user and trigger onboarding.
    - Supabase sends a verification email (OTP/link).
2. **User verifies email**
    - After verification, the user can sign in.
3. **Frontend obtains the user access token**
    - After login with Supabase, get `session.access_token`.
4. **Frontend calls backend APIs with that token**
    - Send: `Authorization: Bearer <access_token>`
    - This is required for `/api/auth/me`, `/api/pending-accounts/*`, etc.

### 4) Calling your backend from the frontend
- **Base URL**: set something like `VITE_API_URL` / `NEXT_PUBLIC_API_URL` pointing to your backend, e.g. `http://localhost:3000`.
- For any protected endpoint, attach the Supabase JWT:
    - `Authorization: Bearer ${accessToken}`

### 5) Why this works with RLS
- Frontend only ever uses the **anon key**.
- Backend verifies the Supabase JWT, and where tenant-safe DB reads/writes are needed it uses a **user-token Supabase client** (anon key + user JWT) so **RLS is enforced**.
- Backend uses the **service role key** only for admin/provisioning operations (e.g., approving pending accounts) where RLS must be bypassed.

## Custom ID Management
We use the **Sch_Bra_Rol_Num** format for custom IDs.
-   Sequence management is handled via `generate_school_role_id`.
-   If you encounter "duplicate key" errors, run the sequence sync block in `fix_critical_bugs.sql`.

## Security & Performance
-   RLS is enforced on all tables.
-   Functions are secured with `search_path`.
-   FK indexes are optimized.
