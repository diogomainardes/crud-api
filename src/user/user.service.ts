import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDetails } from '../entities/user-details.entity';
import { UserResident } from '../entities/user-resident.entity';
import { User } from '../entities/user.entity';
import { CreateUserPostData } from './user.validation';

@Injectable()
export class UserService {
  findAll() {
    return [
      {
        name: 'Diogo Mainardes',
      },
      {
        name: 'Michele Ambrosio (Mozao)',
      },
    ];
  }

  find = async (id: number) => {
    const user = await User.findOne(id);
    return { ...user, password: undefined };
  };

  findByDocument = async (document: string) => {
    const user = await User.findOne({ document });
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

    const resident = await UserResident.create(newUser.resident);
    const details = await UserDetails.create(newUser.details);
    const user = await User.create({ ...newUser });

    user.birthDate = newUser.birth_date;
    user.emergencyPhone = newUser.emergency_phone;
    user.isAdmin = false;
    user.document = newUser.document.replace(/[.-]/gi, '').trim();

    await user.save();

    resident.userId = details.userId = user.id;

    resident.howManyCars = newUser.resident.how_many_cars;
    resident.howManyChildren = newUser.resident.how_many_children;
    resident.howManyFamilyMembers = newUser.resident.how_many_family_members;
    resident.howMuchTime = newUser.resident.how_much_time;
    resident.haveChildren = newUser.resident.have_children;
    resident.eachChildrenAge = newUser.resident.each_children_age.join(',');

    details.sports = newUser.details.sports;
    details.whatSports = newUser.details.what_sports.join(',');
    details.anotherSports = newUser.details.another_sports || '';

    resident.save();
    details.save();

    return { ...user, password: undefined };
  }

  async update(id: number, updateData: CreateUserPostData) {
    const user = await User.findOne(id);
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);

    const resident = await UserResident.findOne({ userId: id });
    const details = await UserDetails.findOne({ userId: id });

    const residentUpdate = !resident ? await UserResident.create() : resident;
    const detailsUpdate = !details ? await UserDetails.create() : details;

    residentUpdate.userId = detailsUpdate.userId = user.id;

    user.name = updateData.name;
    user.gender = updateData.gender;
    user.phone = updateData.phone;
    user.register = updateData.register;
    user.email = updateData.email;
    user.birthDate = updateData.birth_date;
    user.emergencyPhone = updateData.emergency_phone;

    await user.save();

    residentUpdate.howManyCars = updateData.resident.how_many_cars;
    residentUpdate.howManyChildren = updateData.resident.how_many_children;
    residentUpdate.howManyFamilyMembers = updateData.resident.how_many_family_members;
    residentUpdate.howMuchTime = updateData.resident.how_much_time;
    residentUpdate.haveChildren = updateData.resident.have_children;
    residentUpdate.eachChildrenAge = updateData.resident.each_children_age.join(',');
    residentUpdate.address = updateData.resident.address;
    residentUpdate.type = updateData.resident.type;

    detailsUpdate.sports = updateData.details.sports;
    detailsUpdate.whatSports = updateData.details.what_sports.join(',');
    detailsUpdate.anotherSports = updateData.details.another_sports || '';

    await residentUpdate.save();
    await detailsUpdate.save();

    return { ...user, password: undefined };
  }

  delete = async (id: number) => {
    const user = await User.findOne(id);
    await user.softRemove();
    return { success: true, message: `Usuário ${id} excluído com sucesso` };
  };
}
