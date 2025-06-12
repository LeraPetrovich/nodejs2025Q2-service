import { Injectable } from '@nestjs/common';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/validate/CreateUserDto';
import { Prisma } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: Prisma.UserUncheckedCreateInput = {
      id: uuidv4(),
      login: data.login,
      password: hashedPassword,
      version: 1,
    };
    await this.prisma.user.create({ data: newUser });
  }

  async loginUser(
    data: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { login: data.login },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const accessToken = jwt.sign(
      { sub: user.id, login: user.login },
      JWT_SECRET,
      { expiresIn: '15m' },
    );
    const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, JWT_SECRET) as {
        sub: string;
        iat: number;
        exp: number;
      };
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = jwt.sign(
        { sub: user.id, login: user.login },
        JWT_SECRET,
        { expiresIn: '15m' },
      );
      const newRefreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
