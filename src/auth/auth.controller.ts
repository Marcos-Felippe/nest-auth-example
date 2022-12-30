import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Utilizando o decorator criado para sinalizar que a rota é publica (não necessita autenticação jwt para ser acessada)
  @IsPublic()
  // Utilizando o Local Guard para invocar o Local Strategy, que vai validar a requisição do usuario e permitir ou não o login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // O objeto Request tem atribuido o objeto user (acessado por req.user) pelo metodo validade() do Local Strategy
  // A rota login só será invocada se o usuário tiver sido validado
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
