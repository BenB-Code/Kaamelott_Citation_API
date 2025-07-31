import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @OneToMany(() => Character, (character) => character.actor)
  character: Character[];

  @Column({
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  lastName: string;

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
