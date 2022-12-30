import { Request } from 'express';
import { UserFromJwt } from './UserFromJwt';

export interface AuthRequestJwt extends Request {
  user: UserFromJwt;
}
