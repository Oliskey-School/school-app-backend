export declare class TeacherService {
    static createTeacher(schoolId: string, data: any): Promise<any>;
    static getAllTeachers(schoolId: string): Promise<any[]>;
    static getTeacherById(schoolId: string, id: string): Promise<any>;
    static updateTeacher(schoolId: string, id: string, updates: any): Promise<any>;
    static deleteTeacher(schoolId: string, id: string): Promise<boolean>;
}
//# sourceMappingURL=teacher.service.d.ts.map