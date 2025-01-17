import { Injectable } from '@nestjs/common';
import { UserEntity } from './usuario.entity';

// Provider => Classes que estão com o decorator injectable (injeção de dependencias)
// injectable => classes que são injetadas em outros arquivos
@Injectable()
export class UsuarioRepository {
  private usuarios: UserEntity[] = [];

  async save(user) {
    this.usuarios.push(user);
  }

  async list() {
    return this.usuarios;
  }

  async seachEmail(email: string) {
    //procura o email
    const user = this.usuarios.find((user) => user.email === email);

    //retorna true or false
    return user !== undefined;
  }

  private findById(id: string) {
    const possibleUser = this.usuarios.find((savedUser) => savedUser.id === id);

    if (!possibleUser) throw new Error('Usuário não encontrado');

    return possibleUser;
  }

  // Partial -> Faz com que todas as propriedades sejam opcionais
  // como estamos atualizando o usuario, nao necessariamente atualizaremos todos os dados
  // podemos editar um dado, como todos os dados, então os dados serão opcionais
  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.findById(id);
    Object.entries(updateData).forEach(([chave, valor]) => {
      if (chave === 'id') return;

      user[chave] = valor;
    });
  }

  async remove(id: string) {
    const user = this.findById(id);

    // filtra os usuarios que não tem o id que foi removido
    this.usuarios = this.usuarios.filter((savedUser) => savedUser.id !== id);
    return user;
  }
}
