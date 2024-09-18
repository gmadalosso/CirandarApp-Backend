import { Router } from 'express';
import { createBiblioteca, getBibliotecas, updateBiblioteca, deleteBiblioteca, getBibliotecaById } from '../controllers/bibliotecaController';
import { isAdmin } from '../middleware/authMiddleware'; // Import the middleware

const router: Router = Router();

// Public Route
router.get('/bibliotecas', getBibliotecas);
router.get('/bibliotecas/:id', getBibliotecaById);

// Admin Routes
router.post('/bibliotecas', isAdmin, createBiblioteca);
router.put('/bibliotecas/:id', isAdmin, updateBiblioteca);
router.delete('/bibliotecas/:id', isAdmin, deleteBiblioteca);

export default router;
