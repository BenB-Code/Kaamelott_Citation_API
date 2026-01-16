import { CustomThrottlerGuard } from './custom-throttler.guard';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';
import { ADMIN_API_KEYS, USER_API_KEYS } from '../../../config';
import {
  HEADER_X_API_KEY,
  THROTTLER_ADMIN,
  THROTTLER_PUBLIC,
  THROTTLER_USER,
} from '../../constants';

describe('CustomThrottlerGuard', () => {
  let guard: CustomThrottlerGuard;
  let configService: ConfigService;
  let reflector: Reflector;
  let storageService: ThrottlerStorage;

  const ADMIN_KEY = 'admin-key-123';
  const USER_KEY = 'user-key-456';
  const INVALID_KEY = 'invalid-key';

  const createMockRequest = (apiKey?: string, ip = '127.0.0.1'): object => ({
    headers: {
      [HEADER_X_API_KEY]: apiKey,
    },
    ip,
  });

  const createMockContext = (apiKey?: string, ip = '127.0.0.1'): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => createMockRequest(apiKey, ip),
      }),
      getHandler: () => jest.fn(),
      getClass: () => jest.fn(),
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    configService = {
      get: jest.fn((key: string) => {
        if (key === ADMIN_API_KEYS) return ADMIN_KEY;
        if (key === USER_API_KEYS) return USER_KEY;
        return undefined;
      }),
    } as unknown as ConfigService;

    reflector = new Reflector();

    storageService = {
      increment: jest.fn(),
      get: jest.fn(),
    } as unknown as ThrottlerStorage;

    const options = {
      throttlers: [
        { name: THROTTLER_PUBLIC, ttl: 60000, limit: 5 },
        { name: THROTTLER_USER, ttl: 60000, limit: 10 },
        { name: THROTTLER_ADMIN, ttl: 60000, limit: 100 },
      ],
    };

    guard = new CustomThrottlerGuard(options, storageService, reflector, configService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('isAdminKey', () => {
    it('should return true for valid admin key', () => {
      expect(guard.isAdminKey(ADMIN_KEY)).toBe(true);
    });

    it('should return false for user key', () => {
      expect(guard.isUserKey(ADMIN_KEY)).toBe(false);
    });

    it('should return false for invalid key', () => {
      expect(guard.isAdminKey(INVALID_KEY)).toBe(false);
    });
  });

  describe('isUserKey', () => {
    it('should return true for valid user key', () => {
      expect(guard.isUserKey(USER_KEY)).toBe(true);
    });

    it('should return false for admin key', () => {
      expect(guard.isAdminKey(USER_KEY)).toBe(false);
    });

    it('should return false for invalid key', () => {
      expect(guard.isUserKey(INVALID_KEY)).toBe(false);
    });
  });

  describe('getTracker', () => {
    it('should return API key when provided', async () => {
      const req = createMockRequest(USER_KEY, '192.168.1.1');

      const tracker = await guard['getTracker'](req);

      expect(tracker).toBe(USER_KEY);
    });

    it('should return IP when no API key', async () => {
      const req = createMockRequest(undefined, '192.168.1.1');

      const tracker = await guard['getTracker'](req);

      expect(tracker).toBe('192.168.1.1');
    });

    it('should return "unknown" when no API key and no IP', async () => {
      const req = { headers: {} };

      const tracker = await guard['getTracker'](req);

      expect(tracker).toBe('unknown');
    });
  });

  describe('getExpectedThrottler', () => {
    it('should return THROTTLER_ADMIN for admin key', () => {
      const result = guard['getExpectedThrottler'](ADMIN_KEY);

      expect(result).toBe(THROTTLER_ADMIN);
    });

    it('should return THROTTLER_USER for user key', () => {
      const result = guard['getExpectedThrottler'](USER_KEY);

      expect(result).toBe(THROTTLER_USER);
    });

    it('should return THROTTLER_PUBLIC for invalid key', () => {
      const result = guard['getExpectedThrottler'](INVALID_KEY);

      expect(result).toBe(THROTTLER_PUBLIC);
    });

    it('should return THROTTLER_PUBLIC when no key', () => {
      const result = guard['getExpectedThrottler'](undefined);

      expect(result).toBe(THROTTLER_PUBLIC);
    });
  });

  describe('handleRequest', () => {
    let superHandleRequestSpy: jest.SpyInstance;

    beforeEach(() => {
      superHandleRequestSpy = jest
        .spyOn(Object.getPrototypeOf(CustomThrottlerGuard.prototype), 'handleRequest')
        .mockResolvedValue(true);
    });

    afterEach(() => {
      superHandleRequestSpy.mockRestore();
    });

    it('should skip throttler when name does not match expected', async () => {
      const context = createMockContext(ADMIN_KEY);
      const requestProps = {
        context,
        throttler: { name: THROTTLER_PUBLIC, ttl: 60000, limit: 5 },
        limit: 5,
        ttl: 60000,
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      };

      const result = await guard['handleRequest'](requestProps);

      expect(result).toBe(true);
      expect(superHandleRequestSpy).not.toHaveBeenCalled();
    });

    it('should call super.handleRequest when throttler matches', async () => {
      const context = createMockContext(USER_KEY);
      const requestProps = {
        context,
        throttler: { name: THROTTLER_USER, ttl: 60000, limit: 10 },
        limit: 10,
        ttl: 60000,
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      };

      const result = await guard['handleRequest'](requestProps);

      expect(result).toBe(true);
      expect(superHandleRequestSpy).toHaveBeenCalledWith(requestProps);
    });

    it('should use PUBLIC throttler when no API key', async () => {
      const context = createMockContext();
      const requestProps = {
        context,
        throttler: { name: THROTTLER_PUBLIC, ttl: 60000, limit: 5 },
        limit: 5,
        ttl: 60000,
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      };

      await guard['handleRequest'](requestProps);

      expect(superHandleRequestSpy).toHaveBeenCalled();
    });
  });

  describe('Multiple keys support', () => {
    beforeEach(() => {
      (configService.get as jest.Mock).mockImplementation((key: string) => {
        if (key === ADMIN_API_KEYS) return 'admin1,admin2,admin3';
        if (key === USER_API_KEYS) return 'user1,user2';
        return undefined;
      });
    });

    it('should recognize any admin key from the list', () => {
      expect(guard.isAdminKey('admin1')).toBe(true);
      expect(guard.isAdminKey('admin2')).toBe(true);
      expect(guard.isAdminKey('admin3')).toBe(true);
    });

    it('should recognize any user key from the list', () => {
      expect(guard.isUserKey('user1')).toBe(true);
      expect(guard.isUserKey('user2')).toBe(true);
    });

    it('should not recognize keys not in the list', () => {
      expect(guard.isAdminKey('admin4')).toBe(false);
      expect(guard.isUserKey('user3')).toBe(false);
    });
  });
});
