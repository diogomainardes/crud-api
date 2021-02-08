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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {
  CheckDocumentUserData,
  CreateUserPostData,
  UpdateUserPostData,
  UpdatePasswordPostData,
} from './user.validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  findAll(@Query() query) {
    return this.userService.findAll(query);
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
  find(@Request() req, @Param() params) {
    if (req.user.role == 'admin' || req.user.id == params.id) {
      return this.userService.find(params.id);
    }
    throw new HttpException(
      'Sem autorização para este comando',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @Post('')
  async create(@Body() body: CreateUserPostData) {
    const user = await this.userService.create(body);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/toggle-admin')
  async setAdmin(@Request() req, @Param() params) {
    if (req.user.role == 'admin') {
      const user = await this.userService.toggleAdmin(params.id);
      return user;
    }
    throw new HttpException(
      'Sem autorização para este comando',
      HttpStatus.UNAUTHORIZED,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Request() req,
    @Param() params,
    @Body() body: UpdateUserPostData,
  ) {
    if (req.user.role == 'admin' || req.user.id == params.id) {
      const user = await this.userService.update(params.id, body);
      return user;
    }
    throw new HttpException(
      'Sem autorização para este comando',
      HttpStatus.UNAUTHORIZED,
    );
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
