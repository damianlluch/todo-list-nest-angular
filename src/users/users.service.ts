import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(user: Partial<User>): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async login(user: Partial<User>): Promise<User> {
    const foundUser = await this.usersRepository.findOne({
      where: { username: user.username },
    });
    if (!foundUser) {
      return null;
    }
    if (await bcrypt.compare(user.password, foundUser.password)) {
      return foundUser;
    } else {
      return null;
    }
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
}
