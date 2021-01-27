import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column()
  sports: boolean;

  @Column({
    name: 'what_sports',
    nullable: true,
  })
  whatSports: string;

  @Column({
    name: 'another_sport',
  })
  anotherSports: string;
}
