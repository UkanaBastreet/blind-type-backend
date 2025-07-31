import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from './types/role-enum.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    const res = await this.usersRepository.find({
      select: {
        id: true,
        email: true,
        games: true,
      },
    });
    return res;
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
      role: RoleEnum.USER,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = await this.usersRepository.delete({ id });

    return user;
  }

  async getShortById(id: string) {
    const user = await this.findById(id);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return await this.usersRepository.exists({ where: { email } });
  }
}
