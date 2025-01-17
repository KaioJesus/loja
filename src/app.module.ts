import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DBConfigConfigService } from './config/db.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    ConfigModule.forRoot({
      // Este é o método de configuração inicial do ConfigModule do NestJS. Ele é responsável por carregar e disponibilizar variáveis de ambiente e outras configurações para sua aplicação.
      isGlobal: true, // Esta opção torna o ConfigModule disponível globalmente em toda sua aplicação, sem necessidade de importá-lo em cada módulo individualmente. Em outras palavras: Você pode injetar o ConfigService em qualquer parte da aplicação
    }),
    TypeOrmModule.forRootAsync({
      // Este método é usado quando você precisa configurar o TypeORM de forma assíncrona, em vez de usar configurações estáticas.
      useClass: DBConfigConfigService, // Isso indica qual classe será responsável por fornecer as configurações. Esta classe deve implementar TypeOrmOptionsFactory e ter um método createTypeOrmOptions() que retorna as configurações do TypeORM.
      inject: [DBConfigConfigService], // inject: [DBConfigConfigService] - Isso instrui o NestJS a injetar a instância de DBConfigConfigService no container de dependências.
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
