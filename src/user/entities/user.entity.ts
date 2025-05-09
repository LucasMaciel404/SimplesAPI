import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Card } from 'src/card/entities/card.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // aceitando nulo
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'date', nullable: true })
  birthDate?: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
