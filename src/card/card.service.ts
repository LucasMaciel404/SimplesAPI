import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from 'src/auth/jwt/dto/jwt.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para criar um card
  async create(dto: CreateCardDto, user_id: string): Promise<Card> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    delete (user as Partial<User>).password;

    const card = this.cardRepository.create({
      ...dto,
      user,
    });

    return this.cardRepository.save(card);
  }

  // Método para obter todos os cards
  async findAll(id: string): Promise<{ cards: Card[]; name: string }> {
    const cardsPromise = this.cardRepository.find({ where: { user: { id } } });
    const usuarioPromise = this.userRepository.findOneBy({ id: id });

    const [cards, usuario] = await Promise.all([cardsPromise, usuarioPromise]);

    if (!cards) throw new NotFoundException('Cards não encontrados');
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    return { cards: cards, name: usuario.name };
  }

  async findOne(id: string, user_id?: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!card) throw new NotFoundException('Card não encontrado');

    if (user_id && card.user.id !== user_id) {
      throw new ForbiddenException('Acesso não autorizado a este card');
    }

    return card;
  }

  async update(card_id: string, dto: UpdateCardDto, user: JwtPayload): Promise<Card> {
    const card = await this.findOne(card_id, user.id); 

    Object.assign(card, dto);
    return this.cardRepository.save(card);
  }

  async remove(id: string, user_id: string): Promise<void> {
    const card = await this.findOne(id, user_id); 
    await this.cardRepository.remove(card);
  }
}
