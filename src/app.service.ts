import { Injectable } from '@nestjs/common';
import { UserFromJwt } from './auth/models/UserFromJwt';

@Injectable()
export class AppService {
  getProfile(user: UserFromJwt): string {
    return user.name;
  }
}
