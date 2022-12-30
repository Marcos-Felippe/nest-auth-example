import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Validando o usuario para permitir o seu login
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  // Fazendo o login do usuario, criando seu token com base nas informações passadas da validação
  async login(user: User): Promise<UserToken> {
    // Criando um payload que é utilizado pelo jwtService para criar um token jwt
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      // Função sign() gera o nosso JWT a partir de um subconjunto das propriedades do objeto user, então retornamos um objeto com uma access_token
      access_token: this.jwtService.sign(payload),
    };
  }
}
