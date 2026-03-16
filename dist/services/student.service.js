"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const supabase_1 = require("../config/supabase");
class StudentService {
    static async enrollStudent(schoolId, enrollmentData) {
        const { firstName, lastName, dateOfBirth, gender, parentName, parentEmail, parentPhone, curriculumType, documentUrls } = enrollmentData;
        if (!firstName || !lastName) {
            throw new Error('First name and last name are required for enrollment.');
        }
        const fullName = `${firstName} ${lastName}`;
        const studentEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@student.school.com`;
        // 1. Create Auth User using Admin Client (Service Role)
        const { data: authUser, error: authError } = await supabase_1.supabase.auth.admin.createUser({
            email: studentEmail,
            password: 'password123', // In real app, generate or send reset link
            user_metadata: {
                full_name: fullName,
                role: 'student',
                school_id: schoolId
            },
            email_confirm: true
        });
        if (authError)
            throw new Error(`Auth creation failed: ${authError.message}`);
        const userId = authUser.user.id;
        // 2. Create User Profile
        const { data: userProfile, error: profileError } = await supabase_1.supabase
            .from('users')
            .insert([{
                id: userId,
                email: studentEmail,
                name: fullName,
                full_name: fullName,
                role: 'student',
                school_id: schoolId,
                is_active: true
            }])
            .select()
            .single();
        if (profileError)
            throw new Error(`User profile creation failed: ${profileError.message}`);
        // 3. Create Student Record
        const { data: student, error: studentError } = await supabase_1.supabase
            .from('students')
            .insert([{
                user_id: userId,
                school_id: schoolId,
                name: fullName,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                gender: gender,
                grade: 1, // Default grade
                attendance_status: 'Present',
                birth_certificate: documentUrls?.birthCertificate,
                previous_report: documentUrls?.previousReport,
                medical_records: documentUrls?.medicalRecords,
                passport_photo: documentUrls?.passportPhoto
            }])
            .select()
            .single();
        if (studentError)
            throw new Error(`Student record creation failed: ${studentError.message}`);
        // 4. Handle Academic Tracks
        const tracks = [];
        if (curriculumType === 'Nigerian' || curriculumType === 'Both') {
            const { data: nigerian } = await supabase_1.supabase.from('curricula').select('id').eq('name', 'Nigerian').single();
            if (nigerian)
                tracks.push({ student_id: student.id, curriculum_id: nigerian.id, status: 'Active', school_id: schoolId });
        }
        if (curriculumType === 'British' || curriculumType === 'Both') {
            const { data: british } = await supabase_1.supabase.from('curricula').select('id').eq('name', 'British').single();
            if (british)
                tracks.push({ student_id: student.id, curriculum_id: british.id, status: 'Active', school_id: schoolId });
        }
        if (tracks.length > 0) {
            await supabase_1.supabase.from('academic_tracks').insert(tracks);
        }
        // 5. Handle Parent (Simple creation for now)
        if (parentEmail) {
            // Check if parent user exists
            let { data: parentUser } = await supabase_1.supabase.from('users').select('id').eq('email', parentEmail).single();
            let parentId;
            if (!parentUser) {
                const parentPass = 'parent123';
                const { data: newParentAuth, error: pAuthErr } = await supabase_1.supabase.auth.admin.createUser({
                    email: parentEmail,
                    password: parentPass,
                    user_metadata: { full_name: parentName, role: 'parent', school_id: schoolId },
                    email_confirm: true
                });
                if (!pAuthErr) {
                    const { data: newParentProfile } = await supabase_1.supabase.from('users').insert([{
                            id: newParentAuth.user.id,
                            email: parentEmail,
                            name: parentName,
                            role: 'parent',
                            school_id: schoolId
                        }]).select().single();
                    const { data: newParent } = await supabase_1.supabase.from('parents').insert([{
                            user_id: newParentAuth.user.id,
                            name: parentName,
                            email: parentEmail,
                            phone: parentPhone,
                            school_id: schoolId
                        }]).select().single();
                    parentId = newParent?.id;
                }
            }
            else {
                const { data: existingParent } = await supabase_1.supabase.from('parents').select('id').eq('user_id', parentUser.id).single();
                parentId = existingParent?.id;
            }
            if (parentId) {
                await supabase_1.supabase.from('parent_children').insert([{
                        parent_id: parentId,
                        student_id: student.id,
                        school_id: schoolId
                    }]);
            }
        }
        return {
            studentId: student.id,
            email: studentEmail
        };
    }
    static async getAllStudents(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('students')
            .select('*')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async getStudentById(schoolId, id) {
        const { data, error } = await supabase_1.supabase
            .from('students')
            .select('*')
            .eq('school_id', schoolId)
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async updateStudent(schoolId, id, updates) {
        const { data, error } = await supabase_1.supabase
            .from('students')
            .update(updates)
            .eq('school_id', schoolId)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteStudent(schoolId, id) {
        const { error } = await supabase_1.supabase
            .from('students')
            .delete()
            .eq('school_id', schoolId)
            .eq('id', id);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map