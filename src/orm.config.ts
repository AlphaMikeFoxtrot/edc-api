import * as path from 'path';
import { Logger } from '@nestjs/common';

let { NODE_ENV: env } = process.env;
env = env || 'dev';

const development: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'edc',
  synchronize: true,
  logging: true,
  entities: [
    path.join(__dirname, '../dist/**/**.entity{.ts,.js}'),
    path.join(__dirname, './**/**.entity{.ts,.js}'),
  ],
};
const production: any = {
  type: 'mysql',
  host: 'sql129.main-hosting.eu',
  port: 3306,
  username: 'u309678516_rfcetl',
  password: 'Nostalgia@2k18',
  database: 'u309678516_rfcetl',
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, '../dist/**/**.entity{.ts,.js}'),
    path.join(__dirname, './**/**.entity{.ts,.js}'),
  ],
};
const defaultConfiguration: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'edc',
  synchronize: true,
  logging: true,
  entities: [
    path.join(__dirname, '../dist/**/**.entity{.ts,.js}'),
    path.join(__dirname, './**/**.entity{.ts,.js}'),
  ],
};

export default function getOrmConfig(): any {
  switch (env) {
    case 'production' || 'prod':
      Logger.log(
        `using ${env}(${production.host}) db configuration`,
        'getOrmConfig()',
      );
      return production;

    case 'development' || 'dev':
      Logger.log(
        `using ${env}(${development.host}) db configuration`,
        'getOrmConfig()',
      );
      return development;

    default:
      Logger.log(
        `using ${env}(${defaultConfiguration.host}) db configuration`,
        'getOrmConfig()',
      );
      return defaultConfiguration;
  }
}
