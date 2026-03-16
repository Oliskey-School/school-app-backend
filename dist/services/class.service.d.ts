export declare class ClassService {
    static getClasses(schoolId: string): Promise<any[]>;
    static createClass(schoolId: string, classData: any): Promise<any>;
    static updateClass(schoolId: string, id: string, updates: any): Promise<any>;
    static deleteClass(schoolId: string, id: string): Promise<boolean>;
}
//# sourceMappingURL=class.service.d.ts.map