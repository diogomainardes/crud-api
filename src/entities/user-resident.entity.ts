import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserResident extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column()
  address: string;

  @Column({
    length: 1,
  })
  type: string;

  @Column({
    name: 'how_much_time',
  })
  howMuchTime: number;

  @Column({
    name: 'how_many_cars',
  })
  howManyCars: number;

  @Column({
    name: 'how_many_family_members',
  })
  howManyFamilyMembers: number;

  @Column({
    name: 'have_children',
  })
  haveChildren: boolean;

  @Column({
    name: 'how_many_children',
  })
  howManyChildren: number;

  @Column({
    name: 'each_children_age',
  })
  eachChildrenAge: string;
}
