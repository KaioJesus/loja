// npm install @nestjs/typeorm typeorm -> instalando a dependencia do typeorm

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DBConfigConfigService implements TypeOrmOptionsFactory {
  // Conexão com o banco de dados
  // retorna as configurações do banco

  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_NAME'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [],
      synchronize: true, // opção de sincronização automática
    };
  }
}
