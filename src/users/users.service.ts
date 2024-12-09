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
    console.log(res);

    return res;
  }

  async findOne(email: string) {
    const user = this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete({ id });
    return user;
  }
}
