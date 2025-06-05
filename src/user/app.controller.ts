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
import type { User } from '@prisma/client';
import { CreateUserDto } from 'src/validate/CreateUserDto';
import { UpdatePasswordDto } from 'src/validate/UpdatePasswordDto';
import { validate as isUUID } from 'uuid';
import { sanitizeUser } from './utils/sanitizeUser';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async getUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.appService.getUsers();
    return users.map(sanitizeUser);
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id') id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = await this.appService.getUser({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  async createNewUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.appService.createUser(createUserDto);
    return sanitizeUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = await this.appService.updateUserPassword(
      { id },
      updatePasswordDto,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return sanitizeUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = await this.appService.deleteUser({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
