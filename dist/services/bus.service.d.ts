export declare class BusService {
    static getBuses(schoolId: string): Promise<any[]>;
    static createBus(schoolId: string, busData: any): Promise<any>;
    static updateBus(schoolId: string, busId: string, updates: any): Promise<any>;
    static deleteBus(schoolId: string, busId: string): Promise<boolean>;
}
//# sourceMappingURL=bus.service.d.ts.map