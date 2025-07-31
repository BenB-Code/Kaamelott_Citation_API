import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @ManyToOne(() => Show, (show) => show._id)
  show: Show;
  @Column()
  show_id: string;

  @Column({
    type: 'varchar',
    length: 75,
  })
  releaseDate: string;

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
