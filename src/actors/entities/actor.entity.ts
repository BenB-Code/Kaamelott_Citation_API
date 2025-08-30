import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from '../../characters/entities/character.entity';
import { Citation } from '../../citations/entities/citation.entity';

@Entity()
@Index(['firstName', 'lastName'])
@Unique(['firstName', 'lastName'])
export class Actor {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => Character, (character) => character.actors)
  characters: Character[];

  @ManyToMany(() => Citation, (citation) => citation.actors)
  citations: Citation[];

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
