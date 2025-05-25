import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.insert(createUserDto);
    return user;
  }

  async findAll() {
    const res = await this.usersRepository.find();
    return res;
  }

  async findOne(email: string) {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOneBy(params: string[]) {
    const user = this.usersRepository.findOneBy({
      [params[0]]: params[1],
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.delete({ id });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
