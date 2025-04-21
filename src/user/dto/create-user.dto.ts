import { IsString, IsEmail, IsOptional, IsInt, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(6)  // Exemplo de exigência de mínimo de 6 caracteres para a senha
  password: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;  // Caso não seja enviado, o valor padrão será 'true'
}
