// src/card/card.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // protege todas as rotas
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findAllByUserId(@Param('id') id: string) {
    return this.cardService.findAllByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }

  // Nova rota protegida para buscar todos os cards de um usuário
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.cardService.findByUserId(userId);
  }
}
