import { IsString, IsEmail, IsOptional, IsInt, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()  // O nome pode ser opcional em um update
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)  // Exigindo que a senha tenha pelo menos 6 caracteres, se fornecida
  password?: string;

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
