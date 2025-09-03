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
import { Show } from '../../shows/entities/show.entity';
import { Episode } from '../../episodes/entities/episode.entity';

@Entity()
@Unique(['show', 'name'])
export class Season {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Show, (show) => show.seasons, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  show: Show;

  @OneToMany(() => Episode, (episode) => episode.season)
  episodes: Episode[];

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
