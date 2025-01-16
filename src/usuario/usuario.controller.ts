import { CreateUserDTO } from './dto/create-user.dto';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

//Controller é o arquivo onde fica as rotas para criação dos endpoints

//decorator
@Controller('/user')
export class UsuarioController {
  constructor(private userRepository: UsuarioRepository) {}

  @Post('/create-user')
  //@Body -> decorator para mandar os dados da requisição
  async criaUsuario(@Body() userData: CreateUserDTO) {
    this.userRepository.save(userData);
    return userData;
  }

  @Get('/list-users')
  async listUsers() {
    return this.userRepository.list();
  }
}
