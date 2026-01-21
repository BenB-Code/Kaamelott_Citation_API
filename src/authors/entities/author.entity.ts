import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Citation } from '../../citations/entities/citation.entity';

@Entity()
@Index(['firstName', 'lastName'])
@Unique(['firstName', 'lastName'])
export class Author {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(() => Citation, (citation) => citation.authors)
  citations: Citation[];

  @Column({
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  lastName: string;

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
