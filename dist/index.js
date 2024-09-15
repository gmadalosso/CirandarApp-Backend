"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configure session middleware (this needs to be before routes that use session)
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Secret key to sign session ID cookie
    resave: false, // Forces session to be saved even when unmodified
    saveUninitialized: false, // Don't save an empty session if it hasn't been modified
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // Secure false for HTTP, maxAge 1 day
}));
// Profile route should come after session is configured
app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.json({ message: 'User Profile', user: req.session.user });
    }
    else {
        res.status(401).json({ message: 'Usuário não autenticado' });
    }
});
// Connect to the database
(0, database_1.connectDB)();
// Routes
app.use('/api/', usuarioRoutes_1.default);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
