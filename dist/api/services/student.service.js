"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStudentById = exports.findAllStudents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    // In a real app, this would fetch from the database.
    // For now, it returns an empty array as the DB is empty.
    return yield prisma.student.findMany({
        include: {
            class: true,
            parents: true,
        },
    });
});
exports.findAllStudents = findAllStudents;
const findStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.student.findUnique({
        where: { id },
        include: {
            class: true,
            parents: true,
            reportCards: true,
            submissions: true,
        },
    });
});
exports.findStudentById = findStudentById;
