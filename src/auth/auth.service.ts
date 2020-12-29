import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { LoginPostData, ResendPostData } from './auth.validation';

@Injectable()
export class AuthService {
    doLogin(login: LoginPostData): object {
        if (login.document === '442.711.178-54') {
            throw new HttpException('Login inválido', 401);
        }
        return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pbWkgTW96YW8iLCJpYXQiOjE1MTYyMzkwMjIsInJvbGUiOiJhZG1pbiIsImlkIjoiMTIyMzEifQ.wB0DD-C902HS7_pcTMvYfMJD05rFD8MMILCGPmjmy-Y'
        };
    }

    resend(document: ResendPostData): object {
        return {
            email: 'dio*******@g***.***'
        };
    }
}
