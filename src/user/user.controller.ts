import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CheckDocumentUserData, CreateUserPostData } from './user.validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async profile(@Request() req) {
    return await this.userService.profile(req.user.id);
  }

  @Post('/check-document')
  @HttpCode(200)
  async checkDocument(@Body() body: CheckDocumentUserData) {
    const user = await this.userService.findByDocument(
      body.document.replace(/[.-]/gi, '').trim(),
    );
    if (user)
      throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);
    return { success: true };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param() params) {
    return this.userService.find(params.id);
  }

  @Post('')
  async create(@Body() body: CreateUserPostData) {
    const user = await this.userService.create(body);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param() params, @Body() body: CreateUserPostData) {
    const user = await this.userService.update(params.id, body);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params) {
    return this.userService
      .delete(params.id)
      .then((user) => user)
      .catch((x) => x);
  }
}
