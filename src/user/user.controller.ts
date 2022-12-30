import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Utilizando o decorator criado para sinalizar que a rota é publica (não necessita autenticação jwt para ser acessada)
  // Retirar este decorator se criar um usuario for uma ação que necessita de autenticação
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
