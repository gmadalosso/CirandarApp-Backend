import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware or route
  } else {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if user is logged in and has admin role
  if (req.session.user && req.session.user.role === 'admin') {
    next(); // Continue if user is admin
  } else {
    return res.status(403).json({ message: 'Acesso negado: Somente administradores podem realizar essa ação.' });
  }
};