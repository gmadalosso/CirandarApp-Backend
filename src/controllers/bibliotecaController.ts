import { Request, Response } from 'express';
import Biblioteca from '../models/Biblioteca';

const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next(); 
  }
  return res.status(403).json({ message: 'Acesso negado: Apenas administradores podem realizar esta ação.' });
};

export const createBiblioteca = [isAdmin, async (req: Request, res: Response) => {
  try {
    const { nome, endereco, contato, horario } = req.body;

    const novaBiblioteca = new Biblioteca({
      nome,
      endereco,
      contato,
      horario,
    });

    const bibliotecaSalva = await novaBiblioteca.save();
    return res.status(201).json({ message: 'Biblioteca criada com sucesso', biblioteca: bibliotecaSalva });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor ao criar biblioteca' });
  }
}];

export const getBibliotecas = async (req: Request, res: Response) => {
  try {
    const bibliotecas = await Biblioteca.find({});
    return res.json({
      message: 'Lista de bibliotecas recuperada com sucesso',
      bibliotecas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor ao recuperar bibliotecas' });
  }
};

export const getBibliotecaById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const biblioteca = await Biblioteca.findById(id);
  
      if (!biblioteca) {
        return res.status(404).json({ message: 'Biblioteca não encontrada' });
      }
  
      return res.json({
        message: 'Biblioteca recuperada com sucesso',
        biblioteca,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor ao recuperar a biblioteca' });
    }
  };  

export const updateBiblioteca = [isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, endereco, contato, horario } = req.body;

    const bibliotecaAtualizada = await Biblioteca.findByIdAndUpdate(id, {
      nome,
      endereco,
      contato,
      horario,
    }, { new: true });

    if (!bibliotecaAtualizada) {
      return res.status(404).json({ message: 'Biblioteca não encontrada' });
    }

    return res.json({ message: 'Biblioteca atualizada com sucesso', biblioteca: bibliotecaAtualizada });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor ao atualizar biblioteca' });
  }
}];

export const deleteBiblioteca = [isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const bibliotecaRemovida = await Biblioteca.findByIdAndDelete(id);

    if (!bibliotecaRemovida) {
      return res.status(404).json({ message: 'Biblioteca não encontrada' });
    }

    return res.json({ message: 'Biblioteca removida com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor ao remover biblioteca' });
  }
}];
