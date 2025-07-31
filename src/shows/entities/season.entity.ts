import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Episode } from './episode.entity';
import { Show } from './show.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn('increment')
  _id: number;

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
