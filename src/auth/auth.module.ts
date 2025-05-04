import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module'; // 👈 importa aqui

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule, // 👈 importante se usa configService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

