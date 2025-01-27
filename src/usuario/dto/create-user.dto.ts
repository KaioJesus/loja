// Dto => Objeto que traz os dados da requisição -> Data transformer object

//npm install class-validator class-transformer -> para instalar os decorators validadores
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validation/email.validator';

export class CreateUserDTO {
  //Decorators validadores para receber os valores pedidos;

  //Propriedade message para customizar a mensagem de erro enviada
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O campo deve ser um e-mail válido' })
  @IsUniqueEmail({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter mais que seis caracteres' })
  password: string;
}

// export class CreateUserResponseDTO {
//   @IsString()
//   message: `Mensagem de sucesso`;
// }
