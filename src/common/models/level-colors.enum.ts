import { LogLevelEnum } from './log-level.enum';
import * as chalk from 'chalk';

export const LevelColors = {
  [LogLevelEnum.ERROR]: chalk.red,
  [LogLevelEnum.WARN]: chalk.yellow,
  [LogLevelEnum.LOG]: chalk.green,
  [LogLevelEnum.INFO]: chalk.blue,
  [LogLevelEnum.DEBUG]: chalk.magenta,
  [LogLevelEnum.VERBOSE]: chalk.cyan,
};
