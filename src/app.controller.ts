import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthRequestJwt } from './auth/models/AuthRequestJwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // O objeto Request tem atribuido o objeto user (acessado por req.user) pelo metodo validade() do JWT Strategy
  @Get()
  getProfile(@Request() req: AuthRequestJwt): string {
    console.log(req.user);
    return this.appService.getProfile(req.user);
  }
}
