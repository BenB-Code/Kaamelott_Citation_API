import { Citation } from 'src/citations/entities/citation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Citation, (citation) => citation.character)
  citations: Citation[];

  @ManyToMany(() => Actor, (actor) => actor.characters)
  @JoinTable({ name: 'character_actor' })
  actors: Actor[];

  @Column({
    type: 'varchar',
    length: 75,
  })
  @Index()
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
