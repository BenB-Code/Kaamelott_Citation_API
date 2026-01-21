import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public';
export const Public = (...args: string[]): CustomDecorator => SetMetadata(PUBLIC_KEY, args);
