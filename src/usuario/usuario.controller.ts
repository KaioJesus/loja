import { CreateUserDTO } from './dto/create-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';
import { ListUsersDTO } from './dto/list-users.dto';
import { UserEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

//Controller é o arquivo onde fica as rotas para criação dos endpoints

//decorator
@Controller('/user')
export class UsuarioController {
  constructor(private userRepository: UsuarioRepository) {}

  @Post('/create-user')
  //@Body -> decorator para mandar os dados da requisição
  async criaUsuario(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.save(userData);

    return { message: `Usuário criado com sucesso` };
  }

  @Get('/list-users')
  async listUsers() {
    const savedUsers = await this.userRepository.list();
    const listUsers = savedUsers.map(
      (user) => new ListUsersDTO(user.id, user.name),
    );
    return listUsers;
  }

  @Put('/edit/:id')
  // decorator @param indica que está capturando o dado da URL
  async editUser(@Param('id') id: string, @Body() newData: EditUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);

    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/remove/:id')
  async removeUser(@Param('id') id: string) {
    await this.userRepository.remove(id);

    return { message: 'Usuário removido com sucesso!' };
  }
}
