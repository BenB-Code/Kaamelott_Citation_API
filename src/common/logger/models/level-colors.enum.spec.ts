import { LevelColors } from './level-colors.enum';
import { LogLevelEnum } from './log-level.enum';
import * as chalk from 'chalk';

describe('LevelColors', () => {
  it('should have color for ERROR level', () => {
    expect(LevelColors[LogLevelEnum.ERROR]).toBe(chalk.red);
  });

  it('should have color for WARN level', () => {
    expect(LevelColors[LogLevelEnum.WARN]).toBe(chalk.yellow);
  });

  it('should have color for LOG level', () => {
    expect(LevelColors[LogLevelEnum.LOG]).toBe(chalk.green);
  });

  it('should have color for INFO level', () => {
    expect(LevelColors[LogLevelEnum.INFO]).toBe(chalk.blue);
  });

  it('should have color for DEBUG level', () => {
    expect(LevelColors[LogLevelEnum.DEBUG]).toBe(chalk.magenta);
  });

  it('should have color for VERBOSE level', () => {
    expect(LevelColors[LogLevelEnum.VERBOSE]).toBe(chalk.cyan);
  });

  it('should have all log levels mapped', () => {
    const levels = Object.values(LogLevelEnum).filter((v) => typeof v === 'number');
    levels.forEach((level) => {
      expect(LevelColors[level as LogLevelEnum]).toBeDefined();
    });
  });
});
