// src/routes/usuarioRoutes.ts
import { Router } from 'express';
import { loginUsuario, getUsuarios } from '../controllers/usuarioController';
import { isAuthenticated } from '../middleware/authMiddleware'; 

const router: Router = Router();

router.post('/login', loginUsuario);
router.get('/usuarios', isAuthenticated, getUsuarios);

// Add this route for the user profile
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'User Profile', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Usuário não autenticado' });
  }
});

export default router;
