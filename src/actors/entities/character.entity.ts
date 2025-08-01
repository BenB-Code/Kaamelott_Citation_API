import { Citation } from 'src/citations/entities/citation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @ManyToMany(() => Actor, (actor) => actor.characters)
  @JoinTable()
  actors: Actor[];

  @ManyToMany(() => Citation, (citation) => citation.characters)
  citations: Citation[];

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
