import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from '../constant/media-type.enum';
import { Movie } from './movie.entity';
import { Season } from './season.entity';

@Entity()
@Index(['mediaType', 'name'])
export class Show {
  @PrimaryGeneratedColumn('increment')
  _id: number;

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
    type: 'enum',
    enum: MediaType,
  })
  mediaType: MediaType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
