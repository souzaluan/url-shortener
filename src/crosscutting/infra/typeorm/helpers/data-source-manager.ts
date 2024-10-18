import { InternalServerError } from '../../../errors/internal-server-error'
import { DataSource, DataSourceOptions } from 'typeorm'

class DataSourceManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: DataSourceManager

  private dataSources: Map<string, DataSource> = new Map()

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager()
    }

    return DataSourceManager.instance
  }

  public async createDataSource(
    name: string,
    option: DataSourceOptions,
  ): Promise<DataSource> {
    const dataSource = this.dataSources
      .set(name, await new DataSource(option).initialize())
      .get(name)

    if (!dataSource) {
      throw new InternalServerError('Datasource não criado!')
    }

    return dataSource
  }

  public getDataSource(dataSourceName: string): DataSource {
    const dataSource = this.dataSources.get(dataSourceName || 'default')

    if (!dataSource) {
      throw new InternalServerError('Datasource não criado!')
    }

    return dataSource
  }
}

export default DataSourceManager
