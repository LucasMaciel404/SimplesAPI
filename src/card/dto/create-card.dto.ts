import { IsNotEmpty, IsNumber, IsUUID, IsDateString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  data: string;

  @IsNumber()
  valor: number;
}
