export declare class AuthService {
    static signup(data: any): Promise<{
        user: any;
        token: string | null;
    }>;
    static login(email: string, password: string): Promise<{
        user: any;
        token: string;
    }>;
    static createUser(data: any): Promise<{
        id: string;
        email: any;
        username: any;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map