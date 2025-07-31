import { Citation } from 'src/citations/entities/citation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @ManyToOne(() => Actor, (actor) => actor.characters, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  actor: Actor;

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
