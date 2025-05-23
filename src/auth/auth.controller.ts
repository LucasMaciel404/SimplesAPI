import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/guard/jwt-auth.guard";
import { JwtPayload } from "./jwt/dto/jwt.dto";
import { User } from "src/user/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return this.authService.register(email, password);
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return this.authService.login(email, password);
  }

  @Post("recover")
  async recoverPassword(@Body("email") email: string) {
    return this.authService.recoverPassword(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  async changePassword(
    @User() user: JwtPayload,
    @Body("newPassword") newPassword: string
  ) {
    return this.authService.changePassword(user.id, newPassword);
  }
}
