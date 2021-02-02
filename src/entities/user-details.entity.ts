import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  sports: boolean;

  @Column({
    nullable: true,
  })
  what_sports: string;

  @Column()
  another_sport: string;

  @OneToOne((type) => User, (user) => user.details)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
