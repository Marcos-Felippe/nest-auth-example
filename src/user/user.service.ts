import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Encriptando a senha do usuario para ser criado
    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    // Simulando a adição em um banco de dados
    data.id = Math.floor(1 + Math.random() * 20);
    this.users.push(data);

    return {
      ...data,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    //return this.prisma.user.findUnique({ where: { email } });
    return this.users.find((user) => user.email === email);
  }
}
