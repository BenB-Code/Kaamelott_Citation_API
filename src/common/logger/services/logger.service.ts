import { Injectable, LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import { stderr, stdout } from 'process';
import { LevelColors } from '../models/level-colors.enum';
import { LogLevelEnum } from '../models/log-level.enum';
import { LoggerOptions } from '../models/logger-options.interface';

@Injectable()
export class Logger implements LoggerService {
  private static instance: Logger;
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
        (process.env.NODE_ENV === 'production'
          ? LogLevelEnum.INFO
          : LogLevelEnum.DEBUG),
    };
  }

  static getInstance(options?: LoggerOptions): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(options);
    }
    return Logger.instance;
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
    return this.contextColors.get(context)!;
  }

  private formatMessage(
    level: LogLevelEnum,
    message: any,
    context?: string,
    trace?: string,
  ): string {
    const timestamp = this.getTimestamp();
    const ctx = context || this.options.context;
    const levelName = LogLevelEnum[level];

    let formattedMessage = '';

    if (this.options.colorize) {
      const levelColor = LevelColors[level];
      formattedMessage = timestamp ? `${chalk.gray(timestamp)} ` : '';
      formattedMessage += `${levelColor.bold(levelName.padEnd(7))}`;

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

  private stringifyMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }

    if (message instanceof Error) {
      return message.stack || message.message;
    }

    if (typeof message === 'object') {
      try {
        return JSON.stringify(message, null, 2);
      } catch (error) {
        return '[Circular Object]';
      }
    }

    return String(message);
  }

  private write(message: string, level: LogLevelEnum): void {
    const stream = level <= LogLevelEnum.WARN ? stderr : stdout;
    stream.write(message + '\n');
  }

  // Méthodes principales du LoggerService NestJS
  log(message: any, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.LOG)) return;
    this.write(
      this.formatMessage(LogLevelEnum.LOG, message, context),
      LogLevelEnum.LOG,
    );
  }

  error(message: any, trace?: string, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.ERROR)) return;
    this.write(
      this.formatMessage(LogLevelEnum.ERROR, message, context, trace),
      LogLevelEnum.ERROR,
    );
  }

  warn(message: any, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.WARN)) return;
    this.write(
      this.formatMessage(LogLevelEnum.WARN, message, context),
      LogLevelEnum.WARN,
    );
  }

  debug(message: any, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.DEBUG)) return;
    this.write(
      this.formatMessage(LogLevelEnum.DEBUG, message, context),
      LogLevelEnum.DEBUG,
    );
  }

  verbose(message: any, context?: string): void {
    if (!this.shouldLog(LogLevelEnum.VERBOSE)) return;
    this.write(
      this.formatMessage(LogLevelEnum.VERBOSE, message, context),
      LogLevelEnum.VERBOSE,
    );
  }

  // Méthode pour logger les requêtes HTTP
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

    const message = `${method} ${url} ${statusCode} - ${responseTime}ms`;
    this.write(this.formatMessage(level, message, context || 'HTTP'), level);
  }

  // Méthode pour créer un logger enfant avec un contexte spécifique
  createChild(context: string): Logger {
    return new Logger({
      ...this.options,
      context,
    });
  }
}

// Export d'une instance singleton par défaut
export const logger = Logger.getInstance();
