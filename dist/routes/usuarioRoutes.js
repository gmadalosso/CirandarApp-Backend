"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/usuarioRoutes.ts
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/login', usuarioController_1.loginUsuario);
router.get('/usuarios', authMiddleware_1.isAuthenticated, usuarioController_1.getUsuarios);
// Add this route for the user profile
router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.json({ message: 'User Profile', user: req.session.user });
    }
    else {
        res.status(401).json({ message: 'Usuário não autenticado' });
    }
});
exports.default = router;
