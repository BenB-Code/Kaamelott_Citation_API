import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from '../constant/media-type.enum';
import { Movie } from './movie.entity';
import { Season } from './season.entity';

@Entity()
@Index(['mediaType', 'name'])
@Unique(['mediaType', 'name'])
export class Show {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Season, (season) => season.show)
  seasons: Season[];

  @OneToMany(() => Movie, (movie) => movie.show)
  movies: Movie[];

  @Column({
    type: 'varchar',
    length: 75,
  })
  @Index()
  name: string;

  @Column({
    type: 'simple-enum',
    enum: MediaType,
  })
  mediaType: MediaType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
