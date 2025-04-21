// src/card/card.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para criar um card
  async create(dto: CreateCardDto): Promise<Card> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    //removendo o password do user
    delete (user as Partial<User>).password;

    const card = this.cardRepository.create({
      ...dto,
      user,
    });

    return this.cardRepository.save(card);
  }

  // Método para obter todos os cards
  findAll(): Promise<Card[]> {
    return this.cardRepository.find({ relations: ['user'] });
  }

  // Método para buscar um card específico
  async findOne(id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!card) throw new NotFoundException('Card não encontrado');
    return card;
  }

  async findAllByUserId(id: string): Promise<Card[]> {
    const card = await this.cardRepository.find({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!card) throw new NotFoundException('User Id não encontrado');
    return card;
  }

  // Método para atualizar um card
  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user) throw new NotFoundException('Usuário não encontrado');
      card.user = user;
    }

    Object.assign(card, dto);
    return this.cardRepository.save(card);
  }

  // Método para remover um card
  async remove(id: string): Promise<void> {
    const card = await this.findOne(id);
    await this.cardRepository.remove(card);
  }

  // Nova função para buscar todos os cards de um usuário específico
  async findByUserId(userId: string): Promise<Card[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    //removendo o password do user
    delete (user as Partial<User>).password;
    
    // Buscando todos os cards associados ao usuário
    return this.cardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
