// src/routes/bibliotecaRoutes.ts
import { Router } from 'express';
import { createBiblioteca, getBibliotecas, updateBiblioteca, deleteBiblioteca, getBibliotecaById } from '../controllers/bibliotecaController';
import { isAdmin } from '../middleware/authMiddleware'; // Import the middleware

const router: Router = Router();

// Public Route: Anyone (admin and default users) can view the list
router.get('/bibliotecas', getBibliotecas);
router.get('/bibliotecas/:id', getBibliotecaById);

// Admin Routes: Only admins can create, update, and delete
router.post('/bibliotecas', isAdmin, createBiblioteca);
router.put('/bibliotecas/:id', isAdmin, updateBiblioteca);
router.delete('/bibliotecas/:id', isAdmin, deleteBiblioteca);

export default router;
