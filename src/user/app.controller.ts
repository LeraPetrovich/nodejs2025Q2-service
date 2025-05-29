import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { User } from 'src/db/types';
import { CreateUserDto } from 'src/validate/CreateUserDto';
import { UpdatePasswordDto } from 'src/validate/UpdatePasswordDto';
import { validate as isUUID } from 'uuid';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getUsers(): Array<User> {
    return this.appService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string): User {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = this.appService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  createNewUser(@Body() createUserDto: CreateUserDto): User {
    return this.appService.createUser(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): User {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = this.appService.updateUserPassword(id, updatePasswordDto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = this.appService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
