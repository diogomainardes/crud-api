import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { UserDetails } from './user-details.entity';
import { UserResident } from './user-resident.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    length: 1,
  })
  gender: string;

  @Column()
  birth_date: Date;

  @Column()
  document: string;

  @Column()
  register: string;

  @Column()
  phone: string;

  @Column()
  emergency_phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({
    default: false,
  })
  is_admin: boolean;

  @Column({
    default: null,
  })
  password_reset_token: string;

  @Column({
    default: null,
  })
  password_reset_token_expire: Date;

  @OneToOne((type) => UserResident, (resident) => resident.user, {
    cascade: ['update'],
  })
  resident: UserResident;

  @OneToOne((type) => UserDetails, (details) => details.user, {
    cascade: ['update'],
  })
  details: UserDetails;
}
