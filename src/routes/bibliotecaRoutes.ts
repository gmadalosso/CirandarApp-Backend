import { Router } from 'express';
import { createBiblioteca, getBibliotecas, updateBiblioteca, deleteBiblioteca, getBibliotecaById } from '../controllers/bibliotecaController';
import { isAdmin } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/bibliotecas', getBibliotecas);
router.get('/bibliotecas/:id', getBibliotecaById);

router.post('/bibliotecas', isAdmin, createBiblioteca);
router.put('/bibliotecas/:id', isAdmin, updateBiblioteca);
router.delete('/bibliotecas/:id', isAdmin, deleteBiblioteca);

export default router;
