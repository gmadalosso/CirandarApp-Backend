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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("./models/Usuario"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Usuario_1.default.deleteMany({});
        const testUserPassword = 'test123456';
        const adminUserPassword = 'admin123456';
        const testUser = new Usuario_1.default({
            nomeCompleto: 'Test User',
            dataNascimento: new Date('1990-01-01'),
            cpf: '11122233344',
            email: 'teste@examplo.com',
            telefone: '1111111111',
            senha: testUserPassword,
            aceitaTermos: true,
            role: 'padrao',
        });
        const adminUser = new Usuario_1.default({
            nomeCompleto: 'Admin User',
            dataNascimento: new Date('1990-01-01'),
            cpf: '55566677788',
            email: 'admin@examplo.com',
            telefone: '2222222222',
            senha: adminUserPassword,
            aceitaTermos: true,
            role: 'admin',
        });
        yield testUser.save();
        yield adminUser.save();
        console.log('Seed users created successfully!');
    }
    catch (error) {
        console.error('Error creating seed users:', error);
    }
});
exports.default = seedUsers;
