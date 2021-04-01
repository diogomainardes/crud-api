import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import md5 from 'md5';
import { SALT_HASH } from 'src/config';
import { getConnection, Like, MoreThan } from 'typeorm';
import { UserDetails } from '../entities/user-details.entity';
import { UserResident } from '../entities/user-resident.entity';
import { User } from '../entities/user.entity';
import { CreateUserPostData, UpdateUserPostData } from './user.validation';

@Injectable()
export class UserService {
  findAll = async (query: any) => {
    const userRepository = getConnection().getRepository(User);
    if (query.filter) {
      const users = await userRepository.find({
        where: [
          {
            name: Like(`%${query.filter}%`),
          },
          {
            email: Like(`%${query.filter}%`),
          },
          {
            document: Like(`%${query.filter}%`),
          },
        ],
        relations: ['details', 'resident'],
      });

      return users.map((user) => {
        user.password = undefined;
        return user;
      });
    }

    const users = await userRepository.find({
      relations: ['details', 'resident'],
    });

    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  };

  find = async (id: number) => {
    const user = await User.findOne(id);
    const details = await UserDetails.findOne({ user_id: id });
    const resident = await UserResident.findOne({ user_id: id });
    return {
      ...user,
      details: {
        ...details,
        what_sports: details.what_sports.split(','),
      },
      resident,
      password: undefined,
    };
  };

  toggleAdmin = async (id: string) => {
    const user = await User.findOne(id);
    user.is_admin = !user.is_admin;
    await user.save();
    return { ...user, password: undefined };
  };

  findByDocument = async (document: string) => {
    const user = await User.findOne({ document });
    return user;
  };

  findByResetToken = async (token: string) => {
    const user = await User.findOne({
      where: {
        password_reset_token: token,
        password_reset_token_expire: MoreThan(new Date()),
      },
    });
    return user;
  };

  updatePassword = async (id: number, newPass: string) => {
    const user = await User.findOne(id);
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    user.password_reset_token = '';
    user.password = md5(await hash(newPass, SALT_HASH));
    await user.save();

    return user;
  };

  async profile(id: number) {
    const user = await User.findOne(id);
    return { ...user, password: undefined };
  }

  async create(newUser: CreateUserPostData) {
    const existDocument = await this.findByDocument(
      newUser.document.replace(/[.-]/gi, '').trim(),
    );

    if (existDocument)
      throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);

    const user = new User();
    const resident = new UserResident();
    const details = new UserDetails();

    user.name = newUser.name;
    user.document = newUser.document.replace(/[.-]/gi, '').trim();
    user.gender = newUser.gender;
    user.phone = newUser.phone;
    user.register = newUser.register;
    user.email = newUser.email;
    user.birth_date = newUser.birth_date;
    user.password = newUser.password ? newUser.password : user.password;
    user.password = md5(await hash(user.password, SALT_HASH));
    user.emergency_phone = newUser.emergency_phone;

    resident.how_many_cars = newUser.resident.how_many_cars;
    resident.how_many_children = newUser.resident.how_many_children;
    resident.how_many_family_members = newUser.resident.how_many_family_members;
    resident.how_much_time = newUser.resident.how_much_time;
    resident.have_children = newUser.resident.have_children;
    resident.each_children_age = newUser.resident.each_children_age;
    resident.address = newUser.resident.address;
    resident.type = newUser.resident.type;
    resident.user = user;

    details.sports = newUser.details.sports;
    details.what_sports = newUser.details.what_sports.join(',');
    details.another_sport = newUser.details.another_sport || '';
    details.user = user;

    await user.save();
    await resident.save();
    await details.save();

    return { ...user, password: undefined };
  }

  async update(id: number, updateData: UpdateUserPostData) {
    const userRepo = await getConnection().getRepository(User);
    const user = await userRepo.findOne(id, {
      relations: ['resident', 'details'],
    });
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    user.name = updateData.name;
    user.gender = updateData.gender;
    user.phone = updateData.phone;
    user.register = updateData.register;
    user.email = updateData.email;
    user.birth_date = updateData.birth_date;
    user.password = updateData.password ? updateData.password : user.password;
    user.password = md5(await hash(user.password, SALT_HASH));
    user.emergency_phone = updateData.emergency_phone;

    user.resident.how_many_cars = updateData.resident.how_many_cars;
    user.resident.how_many_children = updateData.resident.how_many_children;
    user.resident.how_many_family_members =
      updateData.resident.how_many_family_members;
    user.resident.how_much_time = updateData.resident.how_much_time;
    user.resident.have_children = updateData.resident.have_children;
    user.resident.each_children_age = updateData.resident.each_children_age;
    user.resident.address = updateData.resident.address;
    user.resident.type = updateData.resident.type;

    user.details.sports = updateData.details.sports;
    user.details.what_sports = updateData.details.what_sports.join(',');
    user.details.another_sport = updateData.details.another_sport || '';

    await userRepo.save(user);

    return { ...user, password: undefined };
  }

  delete = async (id: number) => {
    const user = await User.findOne(id);
    await user.softRemove();
    return { success: true, message: `Usuário ${id} excluído com sucesso` };
  };
}
