import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
