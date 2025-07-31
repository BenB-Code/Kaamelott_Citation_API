import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './../../actors/entities/character.entity';
import { Author } from './../../authors/entities/author.entity';
import { Episode } from './../../shows/entities/episode.entity';
import { Movie } from './../../shows/entities/movie.entity';

@Entity()
export class Citation {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @ManyToOne(() => Episode, (episode) => episode.citations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  episode: Episode;

  @ManyToOne(() => Movie, (movie) => movie.citations, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  movie: Movie;

  @ManyToMany(() => Character, (character) => character.citations)
  @JoinTable()
  characters: Character[];

  @ManyToMany(() => Author, (author) => author.citations)
  @JoinTable()
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
