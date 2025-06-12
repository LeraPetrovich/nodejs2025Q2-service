import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from 'src/validate/CreateUserDto';
import { UpdatePasswordDto } from 'src/validate/UpdatePasswordDto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import type { User, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(credential: CreateUserDto): Promise<User> {
    const newUser: Prisma.UserUncheckedCreateInput = {
      id: uuidv4(),
      login: credential.login,
      password: credential.password,
      version: 1,
    };

    return this.prisma.user.create({ data: newUser });
  }

  async updateUserPassword(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) {
      return null;
    }
    const { oldPassword, newPassword } = updatePasswordDto;

    if (oldPassword !== user.password) {
      throw new ForbiddenException('Invalid old password');
    }

    const updateUser = await this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        password: newPassword,
        version: user.version + 1,
      },
    });
    return updateUser;
  }

  async deleteUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.delete({
        where: userWhereUniqueInput,
      });
    } catch {
      return null;
    }
  }
}
