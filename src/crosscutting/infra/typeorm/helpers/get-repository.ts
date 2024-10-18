import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import DataSourceManager from './data-source-manager'

function getDataRepository<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  dataSourceName?: string,
): Repository<Entity> {
  return DataSourceManager.getInstance()
    .getDataSource(dataSourceName || 'default')
    .getRepository(entityClass)
}

export default getDataRepository
