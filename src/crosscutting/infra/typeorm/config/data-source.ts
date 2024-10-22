import { DataSourceOptions } from 'typeorm'

import { resolve } from 'path'

import database from '../../../config/database'
import env from '../../../config/environment-variables'

const dataSourceOptions: Map<'default', DataSourceOptions> = new Map([
  [
    'default',
    {
      type: 'postgres',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.name,
      logging: !env.isProduction,
      migrationsRun: true,
      entities: [
        resolve(
          'src',
          'modules',
          '**',
          'infra',
          'typeorm',
          'entities',
          '*.{js,ts}',
        ),
      ],
      migrations: [
        resolve(
          'src',
          'crosscutting',
          'infra',
          'typeorm',
          'migrations',
          '*.{js,ts}',
        ),
      ],
    },
  ],
])

export default dataSourceOptions
