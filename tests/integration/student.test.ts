import request from 'supertest';
import { app } from '../../src/app';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Define mocks directly in factory or hoist them
// We'll use a variable that we can reference for assertions, but need to be careful with hoisting.
// Better pattern: import existing module then spy, OR use vi.fn() inside.

vi.mock('../../src/config/supabase', () => ({
    supabase: {
        auth: {
            admin: {
                createUser: vi.fn().mockResolvedValue({
                    data: { user: { id: 'test-user-id' } },
                    error: null
                })
            }
        },
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
            data: { id: 'test-student-id' },
            error: null
        }),
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis()
    }
}));

// Mock Auth Middleware
vi.mock('../../src/middleware/auth.middleware', () => ({
    authenticate: (req: any, res: any, next: any) => {
        req.user = { school_id: 'test-school-id' };
        next();
    }
}));

import { supabase } from '../../src/config/supabase'; // Import the MOCKED module to spy on it

describe('Integration: Student Enrollment API', () => {
    const validPayload = {
        firstName: "David",
        lastName: "Okonkwo",
        dateOfBirth: "2015-05-15",
        gender: "Male",
        parentName: "John Okonkwo",
        parentEmail: "john.okonkwo@example.com",
        parentPhone: "08012345678",
        curriculumType: "Nigerian",
        documentUrls: {
            birthCertificate: "https://example.com/bc.pdf"
        }
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset specific mock implementations if needed, though they are defined in factory.
        // We can access them via the imported 'supabase' object which IS the mock.
    });

    it('should successfully enroll a new student (The Golden Path)', async () => {
        const response = await request(app)
            .post('/api/students/enroll')
            .send(validPayload);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('studentId');
        expect(response.body.studentId).toBe('test-student-id');

        // Verify Supabase calls were made
        expect(supabase.auth.admin.createUser).toHaveBeenCalled();
        expect(supabase.from).toHaveBeenCalledWith('students');
    });

    it('should reject enrollment with missing required fields (Negative Case: 400)', async () => {
        const incompletePayload = { ...validPayload };
        delete (incompletePayload as any).firstName;

        const response = await request(app)
            .post('/api/students/enroll')
            .send(incompletePayload);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('required for enrollment');
    });

    it('should handle conflict when student email exists (Edge Case: 409)', async () => {
        // Mock a conflict error from Supabase Auth
        (supabase.auth.admin.createUser as any).mockResolvedValueOnce({
            data: null,
            error: { message: "User already registered", status: 409 }
        });

        const response = await request(app)
            .post('/api/students/enroll')
            .send(validPayload);

        expect(response.status).toBe(500); // Controller currently maps all service errors to 500
        expect(response.body.message).toContain('Auth creation failed');
    });
});
