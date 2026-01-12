import type { LogLevelEnum } from './log-level.enum';

export interface LoggerOptions {
  context?: string;
  timestamp?: boolean;
  colorize?: boolean;
  logLevel?: LogLevelEnum;
}
