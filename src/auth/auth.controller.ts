import {
  Controller,
  Post,
  HttpCode,
  Body,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/validate/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.appService.createUser(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.appService.loginUser(createUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshTokens(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      return await this.appService.refreshTokens(refreshToken);
    } catch (err) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
