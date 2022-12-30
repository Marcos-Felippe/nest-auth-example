import { SetMetadata } from '@nestjs/common';

// Criando um decorator para dizer se uma pagina é publica ou não
export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
