import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from '../constant/media-type.enum';
import { Movie } from './movie.entity';
import { Season } from './season.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @OneToMany(() => Season, (season) => season.show)
  show: Season[];

  @OneToMany(() => Movie, (movie) => movie.show)
  movie: Movie[];

  @Column({
    type: 'varchar',
    length: 75,
  })
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
