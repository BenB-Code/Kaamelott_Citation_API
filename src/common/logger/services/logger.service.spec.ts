import { Logger } from './logger.service';
import { LogLevelEnum } from '../models';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('getInstance', () => {
    it('should return singleton instance', () => {
      const instance1 = Logger.getInstance();
      const instance2 = Logger.getInstance();

      expect(instance1).toBe(instance2);
    });

    it('should create instance with options', () => {
      const instance = Logger.getInstance({
        context: 'TestContext',
        logLevel: LogLevelEnum.ERROR,
      });

      expect(instance).toBeDefined();
    });
  });

  describe('setContext', () => {
    it('should set context', () => {
      logger.setContext('NewContext');
      expect(logger['options'].context).toBe('NewContext');
    });
  });

  describe('formatMessage', () => {
    it('should format string message', () => {
      const result = logger['formatMessage'](LogLevelEnum.INFO, 'test message');
      expect(result).toContain('test message');
    });

    it('should format message with context', () => {
      const result = logger['formatMessage'](LogLevelEnum.INFO, 'test', 'TestContext');
      expect(result).toContain('TestContext');
    });

    it('should format message with trace', () => {
      const result = logger['formatMessage'](LogLevelEnum.ERROR, 'error', 'Context', 'stack trace');
      expect(result).toContain('stack trace');
    });

    it('should format without timestamp when disabled', () => {
      logger = new Logger({ timestamp: false });
      const result = logger['formatMessage'](LogLevelEnum.INFO, 'test');
      expect(result).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should format without colors when disabled', () => {
      logger = new Logger({ colorize: false });
      const result = logger['formatMessage'](LogLevelEnum.INFO, 'test');
      expect(result).toContain('[INFO]');
    });
  });

  describe('stringifyMessage', () => {
    it('should return string as is', () => {
      const result = logger['stringifyMessage']('test');
      expect(result).toBe('test');
    });

    it('should stringify Error with stack', () => {
      const error = new Error('test error');
      const result = logger['stringifyMessage'](error);
      expect(result).toContain('test error');
    });

    it('should stringify Error without stack', () => {
      const error = new Error('test error');
      error.stack = undefined;
      const result = logger['stringifyMessage'](error);
      expect(result).toBe('test error');
    });

    it('should return null as string', () => {
      const result = logger['stringifyMessage'](null);
      expect(result).toBe('null');
    });

    it('should return undefined as string', () => {
      const result = logger['stringifyMessage'](undefined);
      expect(result).toBe('undefined');
    });

    it('should stringify number', () => {
      const result = logger['stringifyMessage'](123);
      expect(result).toBe('123');
    });

    it('should stringify boolean', () => {
      const result = logger['stringifyMessage'](true);
      expect(result).toBe('true');
    });

    it('should stringify bigint', () => {
      const result = logger['stringifyMessage'](BigInt(123));
      expect(result).toBe('123');
    });

    it('should stringify symbol', () => {
      const sym = Symbol('test');
      const result = logger['stringifyMessage'](sym);
      expect(result).toContain('test');
    });

    it('should stringify object', () => {
      const obj = { foo: 'bar' };
      const result = logger['stringifyMessage'](obj);
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });

    it('should handle circular objects', () => {
      const obj: any = { foo: 'bar' };
      obj.self = obj;
      const result = logger['stringifyMessage'](obj);
      expect(result).toBe('[Circular Object]');
    });

    it('should return fallback for unknown types', () => {
      const result = logger['stringifyMessage']((() => {}) as unknown);
      expect(result).toBe('[Unknown Type]');
    });
  });

  describe('log', () => {
    it('should log message', () => {
      const writeSpy = jest.spyOn(logger['write'] as any, 'bind').mockImplementation();
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.log('test message');

      expect(process.stdout.write).toHaveBeenCalled();
    });

    it('should not log when level too low', () => {
      logger = new Logger({ logLevel: LogLevelEnum.ERROR });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.log('test');

      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    it('should log with context', () => {
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.log('test', 'TestContext');

      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.error('error message');

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should log error with trace', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.error('error', 'stack trace');

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should log error with context', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.error('error', 'trace', 'Context');

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should log error even at lowest level', () => {
      logger = new Logger({ logLevel: LogLevelEnum.ERROR });
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.error('error');

      expect(process.stderr.write).toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.warn('warning');

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should not log when level too low', () => {
      logger = new Logger({ logLevel: LogLevelEnum.ERROR });
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.warn('warning');

      expect(process.stderr.write).not.toHaveBeenCalled();
    });
  });

  describe('debug', () => {
    it('should log debug message', () => {
      logger = new Logger({ logLevel: LogLevelEnum.DEBUG });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.debug('debug');

      expect(process.stdout.write).toHaveBeenCalled();
    });

    it('should not log when level too low', () => {
      logger = new Logger({ logLevel: LogLevelEnum.INFO });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.debug('debug');

      expect(process.stdout.write).not.toHaveBeenCalled();
    });
  });

  describe('verbose', () => {
    it('should log verbose message', () => {
      logger = new Logger({ logLevel: LogLevelEnum.VERBOSE });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.verbose('verbose');

      expect(process.stdout.write).toHaveBeenCalled();
    });

    it('should not log when level too low', () => {
      logger = new Logger({ logLevel: LogLevelEnum.DEBUG });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.verbose('verbose');

      expect(process.stdout.write).not.toHaveBeenCalled();
    });
  });

  describe('logHttpRequest', () => {
    it('should log INFO for 2xx status', () => {
      logger = new Logger({ logLevel: LogLevelEnum.INFO });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.logHttpRequest('GET', '/api/test', 200, 150);

      expect(process.stdout.write).toHaveBeenCalled();
    });

    it('should log WARN for 4xx status', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.logHttpRequest('GET', '/api/test', 404, 50);

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should log ERROR for 5xx status', () => {
      jest.spyOn(process.stderr, 'write').mockImplementation();

      logger.logHttpRequest('POST', '/api/test', 500, 200);

      expect(process.stderr.write).toHaveBeenCalled();
    });

    it('should use custom context', () => {
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.logHttpRequest('GET', '/test', 200, 100, 'CustomContext');

      expect(process.stdout.write).toHaveBeenCalled();
    });

    it('should not log when level too low', () => {
      logger = new Logger({ logLevel: LogLevelEnum.ERROR });
      jest.spyOn(process.stdout, 'write').mockImplementation();

      logger.logHttpRequest('GET', '/test', 200, 100);

      expect(process.stdout.write).not.toHaveBeenCalled();
    });
  });

  describe('createChild', () => {
    it('should create child logger with new context', () => {
      const child = logger.createChild('ChildContext');

      expect(child).toBeDefined();
      expect(child['options'].context).toBe('ChildContext');
    });

    it('should inherit parent options', () => {
      logger = new Logger({ logLevel: LogLevelEnum.ERROR, colorize: false });
      const child = logger.createChild('ChildContext');

      expect(child['options'].logLevel).toBe(LogLevelEnum.ERROR);
      expect(child['options'].colorize).toBe(false);
    });
  });

  describe('getContextColor', () => {
    it('should assign different colors to different contexts', () => {
      const color1 = logger['getContextColor']('Context1');
      const color2 = logger['getContextColor']('Context2');

      expect(color1).toBeDefined();
      expect(color2).toBeDefined();
    });

    it('should return same color for same context', () => {
      const color1 = logger['getContextColor']('Context1');
      const color2 = logger['getContextColor']('Context1');

      expect(color1).toBe(color2);
    });

    it('should cycle through available colors', () => {
      logger['getContextColor']('C1');
      logger['getContextColor']('C2');
      logger['getContextColor']('C3');
      logger['getContextColor']('C4');
      const color5 = logger['getContextColor']('C5');

      expect(color5).toBeDefined();
    });
  });

  describe('constructor', () => {
    it('should create with default options', () => {
      const log = new Logger();

      expect(log['options'].context).toBe('');
      expect(log['options'].timestamp).toBe(true);
    });

    it('should create with custom options', () => {
      const log = new Logger({
        context: 'Test',
        timestamp: false,
        colorize: false,
        logLevel: LogLevelEnum.WARN,
      });

      expect(log['options'].context).toBe('Test');
      expect(log['options'].timestamp).toBe(false);
      expect(log['options'].colorize).toBe(false);
      expect(log['options'].logLevel).toBe(LogLevelEnum.WARN);
    });

    it('should use production defaults in production env', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const log = new Logger();

      expect(log['options'].colorize).toBe(false);
      expect(log['options'].logLevel).toBe(LogLevelEnum.INFO);

      process.env.NODE_ENV = originalEnv;
    });
  });
});
