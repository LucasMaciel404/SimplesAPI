import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module'; // 👈 importa aqui

@Module({
  imports: [
    UserModule,
    MailModule, // 👈 não esquece disso
    JwtModule.register({
      secret: 'suaChaveSecreta', // ou use dotenv aqui
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
