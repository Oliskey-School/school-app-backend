export declare class ParentService {
    static getParents(schoolId: string): Promise<any[]>;
    static createParent(schoolId: string, parentData: any): Promise<any>;
    static getParentById(schoolId: string, id: string): Promise<any>;
    static updateParent(schoolId: string, id: string, updates: any): Promise<any>;
    static deleteParent(schoolId: string, id: string): Promise<boolean>;
}
//# sourceMappingURL=parent.service.d.ts.map