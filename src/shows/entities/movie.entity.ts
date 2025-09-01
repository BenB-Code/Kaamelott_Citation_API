import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Citation } from '../../citations/entities/citation.entity';
import { Show } from './show.entity';

@Entity()
@Index(['name', 'releaseDate'])
@Unique(['name', 'releaseDate', 'show'])
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Show, (show) => show.movies, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  show: Show;

  @OneToMany(() => Citation, (citation) => citation.movie)
  citations: Citation[];

  @Column({
    type: 'varchar',
    length: 75,
  })
  @Index()
  name: string;

  @Column({
    type: 'date',
  })
  @Index()
  releaseDate: Date;

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
