import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn(user: Partial<User>): Promise<any> {
    const foundUser = await this.usersRepository.findOne({
      where: { username: user.username },
    });
    if (!foundUser) {
      return null;
    }
    if (await bcrypt.compare(user.password, foundUser.password)) {
      const payload = { sub: foundUser.id, username: foundUser.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
        }),
        user: foundUser,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
