import { IsNotEmpty } from 'class-validator';

export class LoginPostData {
  @IsNotEmpty({ message: 'Campo Documento obrigatório' })
  document: string;

  @IsNotEmpty({ message: 'Campo Senha obrigatório' })
  password: string;
}

export class ResendPostData {
  @IsNotEmpty({ message: 'Campo Documento obrigatório' })
  document: string;
}

export class CheckTokenPostData {
  @IsNotEmpty({ message: 'Campo Token obrigatório' })
  token: string;
}
