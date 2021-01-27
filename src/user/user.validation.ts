import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IsOnlyDate } from 'src/shared/only-date.validator';

export class CreateUserResident {
  @IsNotEmpty({ message: 'Campo Endereço obrigatório' })
  address: string;

  @IsNotEmpty({ message: 'Campo Tipo obrigatório' })
  type: string;

  @IsNotEmpty({ message: "Campo 'Quanto' Tempo obrigatório" })
  how_much_time: number;

  @IsNotEmpty({ message: "Campo 'Quantos carros' obrigatório" })
  how_many_cars: number;

  @IsNotEmpty({ message: "Campo 'Quantos membros da família' obrigatório" })
  how_many_family_members: number;

  @IsNotEmpty({ message: "Campo 'Campo tem filhos' obrigatório" })
  have_children: boolean;

  @IsNotEmpty({ message: "Campo 'Quantos filhos' obrigatório" })
  how_many_children: number;

  @IsNotEmpty({ message: "Campo 'Idade d cada filho' obrigatório" })
  each_children_age: number[];
}

export class CreateUserDetails {
  @IsNotEmpty({ message: "Campo 'Pratica Esporte' obrigatório" })
  sports: boolean;

  @IsOptional()
  what_sports: string[];

  @IsOptional()
  another_sports: string;
}

export class CheckDocumentUserData {
  @IsNotEmpty({ message: "Campo 'Document' obrigatório" })
  document: string;
}

export class CreateUserPostData {
  @IsNotEmpty({ message: 'Campo Documento obrigatório' })
  document: string;

  @IsNotEmpty({ message: 'Campo Senha obrigatório' })
  password: string;

  @IsNotEmpty({ message: 'Campo RG obrigatório' })
  register: string;

  @IsNotEmpty({ message: 'Campo Nome obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Campo Sexo obrigatório' })
  gender: string;

  @IsEmail({}, { message: 'Campo Email deve conter um email válido' })
  @IsNotEmpty({ message: 'Campo Email obrigatório' })
  email: string;

  @IsOnlyDate({
    message: 'Campo Data de nascimento deve ser válida',
  })
  @IsNotEmpty({
    message: 'Campo Data de nascimento deve conter uma data válida',
  })
  birth_date: Date;

  @IsNotEmpty({ message: 'Campo Telefone obrigatório' })
  phone: string;

  @IsNotEmpty({ message: 'Campo Telefone de emergência obrigatório' })
  emergency_phone: string;

  @ValidateNested()
  @IsNotEmpty({ message: 'Campo Residência obrigatório' })
  @Type(() => CreateUserResident)
  @IsDefined()
  resident: CreateUserResident;

  @ValidateNested()
  @IsNotEmpty({ message: 'Campo Detalhes obrigatório' })
  @IsDefined()
  @Type(() => CreateUserDetails)
  details: CreateUserDetails;
}
