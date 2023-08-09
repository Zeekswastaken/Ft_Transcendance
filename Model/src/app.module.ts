import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenGuard } from './auth/guards';
import { JWToken } from './auth/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';


@Module({
  imports: [AuthModule,UserModule,JwtModule.register({
    secret:"0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", 
    signOptions: { expiresIn: '1m' }, 
  })],
  controllers: [AppController],
  providers: [AppService,TokenGuard,JWToken,UserService],
})
export class AppModule {}
