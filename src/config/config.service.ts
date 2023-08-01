import { Injectable, Inject } from '@nestjs/common';
import { ConfigOptions, DotenvOptions } from './interfaces';
import { CONFIG_OPTIONS } from './constants';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private dotenvFile: DotenvOptions;
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: ConfigOptions) {
    const filePath = 'config.' + `${process.env.NODE_ENV || 'dev'}.env`;
    const envFile = path.resolve(
      __dirname + '/../../' + options.folder + filePath,
    );
    this.dotenvFile = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string) {
    return this.dotenvFile[key];
  }
}
