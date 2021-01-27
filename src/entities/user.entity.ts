import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  BaseEntity,
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

  @Column({
    name: 'birth_date',
  })
  birthDate: Date;

  @Column()
  document: string;

  @Column()
  register: string;

  @Column()
  phone: string;

  @Column({
    name: 'emergency_phone',
  })
  emergencyPhone: string;

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
    name: 'is_admin',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany((type) => UserResident, (resident) => resident.userId)
  resident: UserResident;

  @OneToMany((type) => UserDetails, (details) => details.userId)
  details: UserDetails;
}
