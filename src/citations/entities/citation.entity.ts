import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './../../actors/entities/actor.entity';
import { Character } from './../../actors/entities/character.entity';
import { Author } from './../../authors/entities/author.entity';
import { Episode } from './../../shows/entities/episode.entity';
import { Movie } from './../../shows/entities/movie.entity';

@Entity()
@Unique(['text', 'episode', 'movie', 'character'])
export class Citation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Episode, (episode) => episode.citations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  episode: Episode;

  @ManyToOne(() => Movie, (movie) => movie.citations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  movie: Movie;

  @ManyToOne(() => Character, (character) => character.citations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  character: Character;

  @ManyToMany(() => Actor, (actor) => actor.citations)
  @JoinTable({ name: 'citation_actor' })
  actors: Actor[];

  @ManyToMany(() => Author, (author) => author.citations)
  @JoinTable({ name: 'citation_author' })
  authors: Author[];

  @Column({
    type: 'text',
  })
  @Index({ fulltext: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
