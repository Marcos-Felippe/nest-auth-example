import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';

// Passport primeiro verifica a assinatura do JWT e decodifica o JSON. Em seguida, invoca nosso validate() passando o JSON decodificado como seu único parâmetro.
// Com base na maneira como a assinatura do JWT funciona, temos a garantia de receber um token válido que assinamos e emitimos anteriormente para um usuário válido.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extraindo o token automaticamente sem a necessidade de implementar extração manual
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //process.env.JWT_SECRET,
    });
  }

  // Usa o payload e retorna um objeto do tipo UserFromJwt, o atribuindo ao objeto Request como req
  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
