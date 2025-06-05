import {
  Injectable,
  // ForbiddenException
} from '@nestjs/common';
import { CreateUserDto } from 'src/validate/CreateUserDto';
// import { UpdatePasswordDto } from 'src/validate/UpdatePasswordDto';
// import { users } from 'src/db/db';
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
}

// createUser(credential: CreateUserDto) {
//   const id = uuidv4();
//   const date = new Date();
//   const newUser = {
//     id,
//     login: credential.login,
//     password: credential.password,
//     version: 1,
//     createdAt: date.getTime(),
//     updatedAt: date.getTime(),
//   };
//   this.prisma.user.create({
//     newUser,
//   });
//   return newUser;
// }

// updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
//   const user = users.find((item) => item.id === id);

//   if (!user) {
//     return;
//   }
//   const { oldPassword, newPassword } = updatePasswordDto;
//   if (oldPassword !== user.password) {
//     throw new ForbiddenException('Invalid old password');
//   }
//   user.password = newPassword;
//   user.version += 1;
//   user.updatedAt = Date.now();
//   return user;
// }

// deleteUser(id: string): User {
//   const index = users.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return;
//   }
//   const [deletedUser] = users.splice(index, 1);
//   return deletedUser;
// }
