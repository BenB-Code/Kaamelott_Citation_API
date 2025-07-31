import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Season } from './season.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('increment')
  _id: string;

  @ManyToOne(() => Season, (season) => season._id)
  season: string;
  @Column()
  season_id: string;

  @Column({
    type: 'varchar',
    length: 75,
  })
  name: string;

  @Column({
    type: 'int2',
  })
  number: number;

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
