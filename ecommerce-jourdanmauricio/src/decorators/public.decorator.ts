// creamos un decorador personalizado
// para utilizar con el guard de acceso

// Permite ingresar información
// para el copntexto del endpoint
// que podremos acceder desde el guard
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// exportamos el nombre del decorador con valor true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
