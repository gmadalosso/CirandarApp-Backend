import mongoose, { Schema, Document } from 'mongoose';

interface IUsuario extends Document {
  nomeCompleto: string;
  dataNascimento: Date;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  crnm?: string;
  responsavel?: {
    nomeCompleto: string;
    cpf: string;
  };
  aceitaTermos: boolean;
  role: 'admin' | 'padrao';  
}

const UsuarioSchema: Schema = new Schema({
  nomeCompleto: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  senha: { type: String, required: true },
  crnm: { type: String },
  responsavel: {
    nomeCompleto: { type: String },
    cpf: { type: String }
  },
  role: { type: String, enum: ['admin', 'padrao'], default: 'padrao' },
  aceitaTermos: { type: Boolean, required: true },
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);
