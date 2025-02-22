import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/auth.config';

@Module({
   controllers: [AuthController],
   providers: [
      { provide: AuthService, useClass: AuthService },
      LocalStrategy
   ],
   exports: [
      AuthService
   ],
   imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
         global: true,
         secret: jwtConstants.secret,
         signOptions: {expiresIn: '60s'}
      }),
   ]
})
export class AuthModule { }
