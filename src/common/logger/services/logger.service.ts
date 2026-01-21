import { Injectable, LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import { stderr, stdout } from 'process';
import { LevelColors, LoggerOptions, LogLevelEnum } from '../models';

@Injectable()
export class Logger implements LoggerService {
  private static instance: Logger | undefined;
  private readonly options: Required<LoggerOptions>;
  private readonly contextColors = new Map<string, chalk.ChalkFunction>();
  private colorIndex = 0;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      context: options.context || '',
      timestamp: options.timestamp ?? true,
      colorize: options.colorize ?? process.env.NODE_ENV !== 'production',
      logLevel:
        options.logLevel ??
        (process.env.NODE_ENV === 'production' ? LogLevelEnum.INFO : LogLevelEnum.DEBUG),
    };
  }

  static getInstance(options?: LoggerOptions): Logger {
    if (!this.instance) {
      this.instance = new Logger(options);
    }
    return this.instance;
  }

  setContext(context: string): void {
    this.options.context = context;
  }

  private shouldLog(level: LogLevelEnum): boolean {
    return level <= this.options.logLevel;
  }

  private getTimestamp(): string {
    if (!this.options.timestamp) return '';
    return new Date().toISOString();
  }

  private getContextColor(context: string): chalk.ChalkFunction {
    if (!this.contextColors.has(context)) {
      const colors = [chalk.cyan, chalk.magenta, chalk.yellow, chalk.blue];
      this.contextColors.set(context, colors[this.colorIndex % colors.length]);
      this.colorIndex++;
    }
    const color = this.contextColors.get(context);
    return color ?? chalk.white;
  }

  private formatMessage(
    level: LogLevelEnum,
    message: unknown,
    context?: string,
    trace?: string,
  ): string {
    const timestamp = this.getTimestamp();
    const ctx = context || this.options.context;
    const levelName = LogLevelEnum[level];

    let formattedMessage = '';

    if (this.options.colorize) {
      const levelColor = LevelColors[level];
      formattedMessage = timestamp ? chalk.gray(timestamp) + ' ' : '';
      formattedMessage += levelColor.bold(levelName.padEnd(7));

      if (ctx) {
        const contextColor = this.getContextColor(ctx);
        formattedMessage += ` ${contextColor(`[${ctx}]`)}`;
      }

      formattedMessage += ` ${levelColor(this.stringifyMessage(message))}`;

      if (trace) {
        formattedMessage += `\n${chalk.gray(trace)}`;
      }
    } else {
      formattedMessage = timestamp ? `${timestamp} ` : '';
      formattedMessage += `[${levelName}]`;
      formattedMessage += ctx ? ` [${ctx}]` : '';
      formattedMessage += ` ${this.stringifyMessage(message)}`;

      if (trace) {
        formattedMessage += `\n${trace}`;
      }
    }

    return formattedMessage;
  }

  private stringifyMessage(message: unknown): string {
    if (typeof message === 'string') {
      return message;
    }

    if (message instanceof Error) {
      return message.stack || message.message;
    }

    if (message === null) {
      return 'null';
    }

    if (message === undefined) {
      return 'undefined';
    }

    if (typeof message === 'number' || typeof message === 'boolean') {
      return String(message);
    }

    if (typeof message === 'bigint' || typeof message === 'symbol') {
      return String(message);
    }

    if (typeof message === 'object') {
      try {
        return JSON.stringify(message, null, 2);
      } catch {
        return '[Circular Object]';
      }
    }
    return '[Unknown Type]';
  }

  private write(message: string, level: LogLevelEnum): void {
    const stream = level <= LogLevelEnum.WARN ? stderr : stdout;
    stream.write(message + '\n');
  }

  log(message: unknown, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.LOG)) return;
    this.write(this.formatMessage(LogLevelEnum.LOG, message, context), LogLevelEnum.LOG);
  }

  error(message: unknown, trace?: string, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.ERROR)) return;
    this.write(this.formatMessage(LogLevelEnum.ERROR, message, context, trace), LogLevelEnum.ERROR);
  }

  warn(message: unknown, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.WARN)) return;
    this.write(this.formatMessage(LogLevelEnum.WARN, message, context), LogLevelEnum.WARN);
  }

  debug(message: unknown, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.DEBUG)) return;
    this.write(this.formatMessage(LogLevelEnum.DEBUG, message, context), LogLevelEnum.DEBUG);
  }

  verbose(message: unknown, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.VERBOSE)) return;
    this.write(this.formatMessage(LogLevelEnum.VERBOSE, message, context), LogLevelEnum.VERBOSE);
  }

  logHttpRequest(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    context?: string,
  ): void {
    const level =
      statusCode >= 500
        ? LogLevelEnum.ERROR
        : statusCode >= 400
          ? LogLevelEnum.WARN
          : LogLevelEnum.INFO;

    if (!this.shouldLog(level)) return;

    const message = `${method} ${url} ${String(statusCode)} - ${String(responseTime)}ms`;
    this.write(this.formatMessage(level, message, context || 'HTTP'), level);
  }

  createChild(context: string): Logger {
    return new Logger({
      ...this.options,
      context,
    });
  }
}

export const logger = Logger.getInstance();
