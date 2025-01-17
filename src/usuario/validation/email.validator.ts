import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// provider
@Injectable()
@ValidatorConstraint({ async: true }) // Validator de assincronidade
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userExist = await this.usuarioRepository.seachEmail(value);
    return !userExist;
  }
}

// criando um decorator
export const IsUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
