import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';

export const Permission = (permissionId: number) => {
  return SetMetadata(PERMISSION_KEY, permissionId);
};
