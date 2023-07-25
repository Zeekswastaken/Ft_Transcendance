import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './database/message.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Use the service name defined in your Docker Compose file
      port: 5432,
      username: 'zeeks',
      password: 'zeee',
      database: 'mynestdb',
      entities: [Message],
      logging: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}