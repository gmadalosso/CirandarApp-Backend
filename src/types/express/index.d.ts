import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: { id: string; nomeCompleto: string; email: string; role: string };
  }
}
