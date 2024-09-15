import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database';
import usuarioRoutes from './routes/usuarioRoutes';
import session from 'express-session';
import bibliotecaRoutes from './routes/bibliotecaRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Configure session middleware (this needs to be before routes that use session)
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', // Secret key to sign session ID cookie
  resave: false, // Forces session to be saved even when unmodified
  saveUninitialized: false, // Don't save an empty session if it hasn't been modified
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // Secure false for HTTP, maxAge 1 day
}));

// Profile route should come after session is configured
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'User Profile', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Usuário não autenticado' });
  }
});

app.post('/logout', (req, res) => {
  // Destroy the session stored on the server
  req.session.destroy((err) => {
    if (err) {
      // Handle the error if session destruction fails
      return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
    }

    // Clear the session cookie in the user's browser
    res.clearCookie('connect.sid'); // Default cookie name for sessions
    return res.json({ message: 'Logout bem-sucedido' });
  });
});

// Routes
app.use('/api/', usuarioRoutes);
app.use('/api/', bibliotecaRoutes); // Add biblioteca routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
