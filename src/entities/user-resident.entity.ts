import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserResident extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  user_id: number;

  @Column()
  address: string;

  @Column({
    length: 1,
  })
  type: string;

  @Column()
  how_much_time: number;

  @Column()
  how_many_cars: number;

  @Column()
  how_many_family_members: number;

  @Column()
  have_children: boolean;

  @Column()
  how_many_children: number;

  @Column()
  each_children_age: string;

  @OneToOne((type) => User, (user) => user.resident)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
