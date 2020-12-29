import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findAll() {
        return [
            {
                name: 'Diogo Mainardes'
            },
            {
                name: 'Michele Ambrosio (Mozao)'
            }
        ]
    }

    find(id: number) {
        return {
                id,
                name: 'Diogo Mainardes',
                gender: 'M',
                document: '2323232323',
                birth_date: '25/10/1984',
                phone: '15991961104',
                emergency_phone: '15991961104',
                email: 'diogo@diogo.com',
                resident: {
                  address: '',
                  type: '',
                  how_much_time: 12,
                  others: {
                    how_many_cars: 2,
                    how_many_family_members: 2,
                    have_children: true,
                    how_many_children: 3,
                    each_children_age: [8,10,12],
                    sports: true,
                    what_sports: ['basketball', 'soccer', 'voleiball'],
                    another_sport: 'baseball'
                  }
                },
                role: 'admin'
              }
        
    }

    profile() {
      return {
              id: '123',
              name: 'Diogo Mainardes',
              gender: 'M',
              document: '2323232323',
              birth_date: '25/10/1984',
              phone: '15991961104',
              emergency_phone: '15991961104',
              email: 'diogo@diogo.com',
              resident: {
                address: '',
                type: '',
                how_much_time: 12,
                others: {
                  how_many_cars: 2,
                  how_many_family_members: 2,
                  have_children: true,
                  how_many_children: 3,
                  each_children_age: [8,10,12],
                  sports: true,
                  what_sports: ['basketball', 'soccer', 'voleiball'],
                  another_sport: 'baseball'
                }
              },
              role: 'admin'
            }
      
        }
}
