export declare class UserService {
    static createUser(schoolId: string, data: any): Promise<any>;
    static getUsers(schoolId: string, role?: string): Promise<any[]>;
    static getUserById(schoolId: string, userId: string): Promise<any>;
    static updateUser(schoolId: string, userId: string, updates: any): Promise<any>;
}
//# sourceMappingURL=user.service.d.ts.map