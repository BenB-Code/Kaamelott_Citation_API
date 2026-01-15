import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PUBLIC_KEY, ROLES_KEY } from '../../decorators';
import { HEADER_X_API_KEY, USER_KEY } from '../../constants';
import { ADMIN_API_KEYS, USER_API_KEYS } from '../../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = !!this.reflector.getAllAndOverride<string[] | undefined>(PUBLIC_KEY, [
      context.getHandler(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader: string = String(request.headers[HEADER_X_API_KEY] ?? '');
    if (!apiKeyHeader) {
      throw new UnauthorizedException('API Key required');
    }

    const isAdmin = this.isAdminKey(apiKeyHeader);
    const isUser = this.isUserKey(apiKeyHeader);
    if (!isAdmin && !isUser) {
      throw new ForbiddenException('Invalid API Key');
    }

    const requiredRoles =
      this.reflector.getAllAndOverride<string[] | undefined>(ROLES_KEY, [context.getHandler()]) ||
      [];
    const hasUserRole = requiredRoles.includes(USER_KEY);

    if (isAdmin || (isUser && hasUserRole)) {
      return true;
    }
    throw new UnauthorizedException('Admin access required');
  }

  isAdminKey(key: string): boolean {
    const adminKeys = this.configService.get<string>(ADMIN_API_KEYS)?.split(',');
    return !!adminKeys?.includes(key);
  }

  isUserKey(key: string): boolean {
    const userKeys = this.configService.get<string>(USER_API_KEYS)?.split(',');
    return !!userKeys?.includes(key);
  }
}
