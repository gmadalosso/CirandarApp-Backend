import { Request, Response } from 'express';
import Usuario from '../models/Usuario'; 
import dotenv from 'dotenv';

dotenv.config();

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    console.log('Validation Error: E-mail or senha missing');  
    return res.status(400).json({ message: 'E-mail e senha são campos obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    console.log("USUARIO: " + JSON.stringify(usuario))

    if (!usuario) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    if (senha !== usuario.senha) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }


    req.session.user = {
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      role: usuario.role,
    };

    console.log('Session user: ', req.session.user);

    return res.json({
      message: 'Login bem-sucedido',
      usuario: {
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find({});
    return res.json({
      message: 'Usuários recuperados com sucesso',
      usuarios,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor ao recuperar usuários' });
  }
};

export const logoutUsuario = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
    }

    res.clearCookie('connect.sid'); 
    return res.json({ message: 'Logout bem-sucedido' });
  });
};
