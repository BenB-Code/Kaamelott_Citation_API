import { Inject, Injectable } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerRequest,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ADMIN_API_KEYS, USER_API_KEYS } from '../../../config';
import {
  HEADER_X_API_KEY,
  THROTTLER_ADMIN,
  THROTTLER_PUBLIC,
  THROTTLER_USER,
} from '../../constants';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { THROTTLER_OPTIONS } from '@nestjs/throttler/dist/throttler.constants';
import { Request } from 'express';

type PartialThrottlerRequest = {
  headers?: Record<string, string | string[] | undefined>;
  ip?: string;
};

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  constructor(
    @Inject(THROTTLER_OPTIONS) protected options: ThrottlerModuleOptions,
    protected storageService: ThrottlerStorage,
    protected reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    super(options, storageService, reflector);
  }

  protected getTracker(req: PartialThrottlerRequest): Promise<string> {
    const apiKey = req.headers?.[HEADER_X_API_KEY] as string | undefined;
    return Promise.resolve(apiKey || req.ip || 'unknown');
  }

  protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const { context, throttler } = requestProps;
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers[HEADER_X_API_KEY] as string | undefined;
    const expectedThrottler = this.getExpectedThrottler(apiKey);

    if (throttler.name !== expectedThrottler) {
      return true;
    }
    return super.handleRequest(requestProps);
  }

  private getExpectedThrottler(apiKey: string | undefined): string {
    if (apiKey && this.isAdminKey(apiKey)) {
      return THROTTLER_ADMIN;
    } else if (apiKey && this.isUserKey(apiKey)) {
      return THROTTLER_USER;
    }
    return THROTTLER_PUBLIC;
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
