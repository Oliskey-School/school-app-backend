export declare class StudentService {
    static enrollStudent(schoolId: string, enrollmentData: any): Promise<{
        studentId: any;
        email: string;
    }>;
    static getAllStudents(schoolId: string): Promise<any[]>;
    static getStudentById(schoolId: string, id: string): Promise<any>;
    static updateStudent(schoolId: string, id: string, updates: any): Promise<any>;
    static deleteStudent(schoolId: string, id: string): Promise<boolean>;
}
//# sourceMappingURL=student.service.d.ts.map