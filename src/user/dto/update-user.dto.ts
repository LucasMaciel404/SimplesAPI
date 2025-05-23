import { IsString, IsEmail, IsOptional, IsInt, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()  
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
  @MinLength(6)  
  password?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;  
}
