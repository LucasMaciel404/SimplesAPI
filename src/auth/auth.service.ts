import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailService } from './../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create(<CreateUserDto>{ email, password: hashedPassword } );

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Email ou senha inválidos');

    return this.generateToken(user);
  }

  private generateToken(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
  async recoverPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newPassword = Math.random().toString(36).slice(-8); // senha aleatória
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.updatePassword(user.id, hashedPassword);

    await this.mailService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      text: `Sua nova senha é: ${newPassword}`,
    });

    return { message: 'Nova senha enviada para o seu e-mail' };
  }
  
  async changePassword(userId: string, newPassword: string) {

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return await this.userService.updatePassword(user.id, hashedPassword);
  }
}
