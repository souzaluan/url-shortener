import 'dotenv/config'

import { DataSource, DataSourceOptions } from 'typeorm'
import dataSourceOptions from '../config/data-source'

const dataSource = dataSourceOptions.get('default')

export default new DataSource(dataSource as DataSourceOptions)
