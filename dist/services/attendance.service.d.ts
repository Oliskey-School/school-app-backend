export declare class AttendanceService {
    static getAttendance(schoolId: string, classId: string, date: string): Promise<any[]>;
    static saveAttendance(schoolId: string, records: any[]): Promise<any[]>;
    static getAttendanceByStudent(schoolId: string, studentId: string): Promise<any[]>;
}
//# sourceMappingURL=attendance.service.d.ts.map