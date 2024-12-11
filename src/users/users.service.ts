import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.usersRepository.update(id, updateUserDto);
    return res;
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete({ id });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
