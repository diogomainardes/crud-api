import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Please provide only date like MM-DD-YYYY',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-([12]\d{3})/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}