import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @ManyToOne(() => Actor, (actor) => actor._id)
  actor: Actor;
  @Column()
  actor_id: string;

  @Column({
    type: 'varchar',
    length: 75,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  picture: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
