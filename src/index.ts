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

app.use(cors({
  origin: 'http://localhost:8100', 
  credentials: true 
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', 
  resave: false, 
  saveUninitialized: false, 
  cookie: { 
    secure: false,  
    sameSite: 'lax', 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

connectDB();
seedUsers();

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'User Profile', user: req.session.user });
  } else {
    res.status(401).json({ message: 'Usuário não autenticado' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
    }

    res.clearCookie('connect.sid'); 
    return res.json({ message: 'Logout bem-sucedido' });
  });
});

// Routes
app.use('/api/', usuarioRoutes);
app.use('/api/', bibliotecaRoutes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
