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
exports.getUsuarios = exports.loginUsuario = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const usuario = yield Usuario_1.default.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }
        if (senha !== usuario.senha) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }
        // Store the user in the session
        req.session.user = {
            id: usuario.id.toString(),
            nomeCompleto: usuario.nomeCompleto,
            email: usuario.email,
            role: usuario.role,
        };
        return res.json({
            message: 'Login bem-sucedido',
            usuario: {
                nomeCompleto: usuario.nomeCompleto,
                email: usuario.email,
                role: usuario.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});
exports.loginUsuario = loginUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.find({});
        return res.json({
            message: 'Usuários recuperados com sucesso',
            usuarios,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor ao recuperar usuários' });
    }
});
exports.getUsuarios = getUsuarios;
