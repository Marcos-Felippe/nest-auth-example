import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // Chamando o serviço de validação para validar o usuario para permitir o seu login.
  // Passport cria automaticamente um objeto user, baseado no valor retornado do metodo validate(), e o atribui ao objeto Request como req.user
  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
