import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Local Guard é o "guardião" que invoca o Local Strategy, que chama a validação
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}
