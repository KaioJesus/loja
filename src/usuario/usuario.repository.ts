import { Injectable } from '@nestjs/common';

// Provider => Classes que estão com o decorator injectable (injeção de dependencias)
// injectable => classes que são injetadas em outros arquivos
@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async save(user) {
    this.usuarios.push(user);
  }

  async list() {
    return this.usuarios;
  }
}
