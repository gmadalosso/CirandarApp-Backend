import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database';
import usuarioRoutes from './routes/usuarioRoutes';
import session from 'express-session';
import bibliotecaRoutes from './routes/bibliotecaRoutes';
import cors from 'cors'; // Import cors
import seedUsers from './criaUsuarios';

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors({
  origin: 'http://localhost:8100', // Your frontend URL (Ionic)
  credentials: true // Allow credentials (such as cookies and sessions)
}));

// Configure session middleware only once
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', // Secret key to sign session ID cookie
  resave: false, // Forces session to be saved even when unmodified
  saveUninitialized: false, // Don't save an empty session if it hasn't been modified
  cookie: { 
    secure: false,  // Must be false for HTTP
    sameSite: 'lax', // Adjust SameSite as per your needs
    maxAge: 24 * 60 * 60 * 1000 // Session expiry (1 day)
  }
}));

// Connect to the database
connectDB();
seedUsers();

// Profile route should come after session is configured
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'User Profile', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Usuário não autenticado' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
    }

    res.clearCookie('connect.sid'); // Clear session cookie in the browser
    return res.json({ message: 'Logout bem-sucedido' });
  });
});

// Routes
app.use('/api/', usuarioRoutes);
app.use('/api/', bibliotecaRoutes); // Add biblioteca routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
