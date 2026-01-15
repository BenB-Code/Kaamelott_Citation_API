import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ADMIN_API_KEYS, USER_API_KEYS } from '../../../config';
import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { HEADER_X_API_KEY } from '../../constants';
import { PUBLIC_KEY, ROLES_KEY } from '../../decorators';

describe('ApiKeyGuard', () => {
  let reflector: Reflector;
  let configService: ConfigService;
  let apiKeyGuard: ApiKeyGuard;

  const USER_KEY = '67890';
  const ADMIN_KEY = '12345';
  const INVALID_KEY = 'invalid-key';

  const createMockContext = (apiKey?: string): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            [HEADER_X_API_KEY]: apiKey,
          },
        }),
      }),
      getHandler: () => jest.fn(),
    }) as unknown as ExecutionContext;

  const mockRoute = (isPublic: boolean, roles?: string[]): void => {
    jest.spyOn(reflector, 'getAllAndOverride').mockImplementation((key) => {
      if (key === PUBLIC_KEY) return isPublic ? true : undefined;
      if (key === ROLES_KEY) return roles;
      return undefined;
    });
  };

  beforeEach(() => {
    reflector = new Reflector();
    configService = {
      get: jest.fn((key: string) => {
        if (key === USER_API_KEYS) return USER_KEY;
        if (key === ADMIN_API_KEYS) return ADMIN_KEY;
        return undefined;
      }),
    } as unknown as ConfigService;

    apiKeyGuard = new ApiKeyGuard(reflector, configService);
  });

  it('should be defined', () => {
    expect(apiKeyGuard).toBeDefined();
  });

  describe('Public routes', () => {
    it('should pass without API key when @Public() decorator is present', () => {
      mockRoute(true);
      const context = createMockContext();

      const result = apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should pass with any API key when @Public() decorator is present', () => {
      mockRoute(true);
      const context = createMockContext(INVALID_KEY);

      const result = apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('Admin routes (no @Roles decorator)', () => {
    it('should pass when admin API key is provided', () => {
      mockRoute(false, undefined);
      const context = createMockContext(ADMIN_KEY);

      const result = apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException when user API key is provided', () => {
      mockRoute(false, undefined);
      const context = createMockContext(USER_KEY);

      expect(() => apiKeyGuard.canActivate(context)).toThrow(UnauthorizedException);
    });
  });

  describe('User routes (@Roles("user") decorator)', () => {
    it('should pass when admin API key is provided', () => {
      mockRoute(false, ['user']);
      const context = createMockContext(ADMIN_KEY);

      const result = apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should pass when user API key is provided', () => {
      mockRoute(false, ['user']);
      const context = createMockContext(USER_KEY);

      const result = apiKeyGuard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('Missing API key', () => {
    it('should throw UnauthorizedException when no API key is provided on protected route', () => {
      mockRoute(false, undefined);
      const context = createMockContext();

      expect(() => apiKeyGuard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when empty API key is provided', () => {
      mockRoute(false, ['user']);
      const context = createMockContext('');

      expect(() => apiKeyGuard.canActivate(context)).toThrow(UnauthorizedException);
    });
  });

  describe('Invalid API key', () => {
    it('should throw ForbiddenException when API key does not match any valid key', () => {
      mockRoute(false, undefined);
      const context = createMockContext(INVALID_KEY);

      expect(() => apiKeyGuard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when API key does not match on user route', () => {
      mockRoute(false, ['user']);
      const context = createMockContext(INVALID_KEY);

      expect(() => apiKeyGuard.canActivate(context)).toThrow(ForbiddenException);
    });
  });
});
