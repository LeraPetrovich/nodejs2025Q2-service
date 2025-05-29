import { Injectable, ForbiddenException } from '@nestjs/common';
import type { User } from 'src/db/types';
import { CreateUserDto } from 'src/validate/CreateUserDto';
import { UpdatePasswordDto } from 'src/validate/UpdatePasswordDto';
import { users } from 'src/db/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getUsers(): Array<User> {
    return users;
  }
  getUser(id: string): User {
    return users.find((item) => item.id === id);
  }
  createUser(credential: CreateUserDto) {
    const id = uuidv4();
    const date = new Date();
    const newUser = {
      id,
      login: credential.login,
      password: credential.password,
      version: 0,
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
    };
    users.push(newUser);
    return newUser;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = users.find((item) => item.id === id);

    if (!user) {
      return;
    }
    const { oldPassword, newPassword } = updatePasswordDto;
    if (oldPassword !== user.password) {
      throw new ForbiddenException('Invalid old password');
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  deleteUser(id: string): User {
    const index = users.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    const [deletedUser] = users.splice(index, 1);
    return deletedUser;
  }
}
