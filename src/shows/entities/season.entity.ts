import {
  Column,
  CreateDateColumn,
  Entity,
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
  _id: string;

  @ManyToOne(() => Show, (show) => show._id)
  show: string;
  @Column()
  show_id: string;

  @OneToMany(() => Episode, (episode) => episode.season)
  episode: Episode[];

  @Column({
    type: 'varchar',
    length: 75,
  })
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
