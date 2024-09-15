import mongoose, { Schema, Document } from 'mongoose';

interface IBiblioteca extends Document {
  nome: string;
  endereco: string;
  contato: string;
  horario: string;
}

const BibliotecaSchema: Schema = new Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  contato: { type: String, required: false },
  horario: { type: String, required: true },
});

export default mongoose.model<IBiblioteca>('Biblioteca', BibliotecaSchema);