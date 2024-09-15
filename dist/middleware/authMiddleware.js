"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware or route
    }
    else {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
};
exports.isAuthenticated = isAuthenticated;
