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
import { JwtAuthGuard } from 'src/auth/jwt/guard/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { JwtPayload } from 'src/auth/jwt/dto/jwt.dto';

@UseGuards(JwtAuthGuard) 
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() dto: CreateCardDto, @User() user: JwtPayload) {
    return this.cardService.create(dto, user.id);
  }

  @Get()
  findAll(@User() user: JwtPayload) {
    return this.cardService.findAll(user.id);
  }

  @Patch(':id')
  update(@Param('id') card_id: string, @Body() dto: UpdateCardDto, @User() user: JwtPayload) {
    return this.cardService.update(card_id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.cardService.remove(id, user.id);
  }
}
