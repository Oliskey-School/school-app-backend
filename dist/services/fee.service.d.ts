export declare class FeeService {
    static createFee(schoolId: string, data: any): Promise<{
        id: any;
        studentId: any;
        title: any;
        amount: any;
        paidAmount: any;
        status: any;
        dueDate: any;
        createdAt: any;
    }>;
    static getAllFees(schoolId: string): Promise<{
        id: any;
        studentId: any;
        title: any;
        amount: any;
        paidAmount: any;
        status: any;
        dueDate: any;
        createdAt: any;
    }[]>;
    static getFeeById(schoolId: string, id: string): Promise<{
        id: any;
        studentId: any;
        title: any;
        amount: any;
        paidAmount: any;
        status: any;
        dueDate: any;
        createdAt: any;
    }>;
    static updateFee(schoolId: string, id: string, updates: any): Promise<{
        id: any;
        studentId: any;
        title: any;
        amount: any;
        paidAmount: any;
        status: any;
        dueDate: any;
        createdAt: any;
    }>;
    static updateFeeStatus(schoolId: string, id: string, status: string): Promise<{
        id: any;
        studentId: any;
        title: any;
        amount: any;
        paidAmount: any;
        status: any;
        dueDate: any;
        createdAt: any;
    }>;
    static deleteFee(schoolId: string, id: string): Promise<boolean>;
}
//# sourceMappingURL=fee.service.d.ts.map