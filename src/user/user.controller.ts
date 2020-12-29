import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    find(@Param() params) {
        return this.userService.find(params.id);
    }

    @Get('profile')
    profile() {
        return this.userService.profile();
    }

    @Post('')
    create() {
        
    }

    @Put(':id')
    update() {
        return null;
    }

    @Delete(':id')
    delete() {

    }
}
