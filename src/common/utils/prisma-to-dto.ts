import { plainToInstance } from 'class-transformer';

/**
 * Transforma una entidad Prisma o array a una instancia de DTO decorado
 * @param dtoClass - La clase del DTO decorado con @ApiProperty
 * @param data - El objeto (o array) a transformar
 */
export function prismaToDto<T, V>(dtoClass: new () => T, data: V | V[]): T | T[] {
  return plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
}
