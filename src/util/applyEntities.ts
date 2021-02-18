import cloneDeep from 'lodash/cloneDeep'
import { TableFullMetadata } from '../gen/api/api'
import { DraftEntity } from '../features/product/tableSlice'

export const applyEntities = (
  fullMetadata: TableFullMetadata | undefined,
  entities: DraftEntity[]
) => {
  let metadata_copy = cloneDeep(fullMetadata)

  entities.forEach((entity, i) => {
    if (entity.edited) {
      metadata_copy.column_metadata_list[i].entity_name = entity !== null ? entity.entityName : null
    }
  })
  return metadata_copy
}
