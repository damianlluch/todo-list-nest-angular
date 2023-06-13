import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from "./dto/user.dto";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() user: RegisterDto): Promise<User> {
    return this.usersService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}