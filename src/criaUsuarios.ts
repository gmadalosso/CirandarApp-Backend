import mongoose from 'mongoose';
import Usuario from './models/Usuario';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
  try {
    await Usuario.deleteMany({});

    const testUserPassword = 'teste123456';
    const adminUserPassword = 'admin123456';

    const testUser = new Usuario({
      nomeCompleto: 'Test User',
      dataNascimento: new Date('1990-01-01'),
      cpf: '11122233344',
      email: 'teste@exemplo.com',
      telefone: '1111111111',
      senha: testUserPassword,
      aceitaTermos: true,
      role: 'padrao',
    });

    const adminUser = new Usuario({
      nomeCompleto: 'Admin User',
      dataNascimento: new Date('1990-01-01'),
      cpf: '55566677788',
      email: 'admin@exemplo.com',
      telefone: '2222222222',
      senha: adminUserPassword,
      aceitaTermos: true,
      role: 'admin',
    });

    await testUser.save();
    await adminUser.save();

    console.log('Usuários de teste criados com sucesso!');
  } catch (error) {
    console.error('Error creating seed users:', error);
  }
};

export default seedUsers;