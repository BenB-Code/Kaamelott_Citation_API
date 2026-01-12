import { LogLevelEnum } from './log-level.enum';

describe('LogLevelEnum', () => {
  it('should have ERROR level', () => {
    expect(LogLevelEnum.ERROR).toBe(0);
  });

  it('should have WARN level', () => {
    expect(LogLevelEnum.WARN).toBe(1);
  });

  it('should have LOG level', () => {
    expect(LogLevelEnum.LOG).toBe(2);
  });

  it('should have INFO level', () => {
    expect(LogLevelEnum.INFO).toBe(3);
  });

  it('should have DEBUG level', () => {
    expect(LogLevelEnum.DEBUG).toBe(4);
  });

  it('should have VERBOSE level', () => {
    expect(LogLevelEnum.VERBOSE).toBe(5);
  });

  it('should have correct order of severity', () => {
    expect(LogLevelEnum.ERROR).toBeLessThan(LogLevelEnum.WARN);
    expect(LogLevelEnum.WARN).toBeLessThan(LogLevelEnum.LOG);
    expect(LogLevelEnum.LOG).toBeLessThan(LogLevelEnum.INFO);
    expect(LogLevelEnum.INFO).toBeLessThan(LogLevelEnum.DEBUG);
    expect(LogLevelEnum.DEBUG).toBeLessThan(LogLevelEnum.VERBOSE);
  });
});
