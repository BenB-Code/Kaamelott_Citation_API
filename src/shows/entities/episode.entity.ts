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
import { Citation } from './../../citations/entities/citation.entity';
import { Season } from './season.entity';

@Entity()
@Index(['season', 'number'])
export class Episode {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @ManyToOne(() => Season, (season) => season.episodes, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  season: Season;

  @OneToMany(() => Citation, (citation) => citation.episode)
  citations: Citation[];

  @Column({
    type: 'varchar',
    length: 150,
  })
  @Index()
  name: string;

  @Column({
    type: 'int2',
    unsigned: true,
  })
  @Index()
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
