import { DataSource } from 'typeorm'
import DataSourceManager from './data-source-manager'

function getDataSource(dataSourceName?: string): DataSource {
  return DataSourceManager.getInstance().getDataSource(
    dataSourceName || 'default',
  )
}

export default getDataSource
