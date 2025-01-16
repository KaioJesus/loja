// Dto => Objeto que traz os dados da requisição

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  //Decorators validadores para receber os valores pedidos;

  //Propriedade message para customizar a mensagem de erro enviada
  @IsString({ message: 'O nome pode ser vazio' })
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined, { message: 'O campo deve ser um e-mail válido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter mais que seis caracteres' })
  password: string;
}
