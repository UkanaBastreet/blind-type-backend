import { Injectable } from '@nestjs/common';
import {} from '@vercel/postgres';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepositry extends Repository<User> {}
