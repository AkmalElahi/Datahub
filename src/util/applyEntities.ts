import cloneDeep from 'lodash/cloneDeep'
import { TableFullMetadata } from 'typescript-axios'
import { DraftEntity } from '../features/product/tableSlice'

export const applyEntities = (
  fullMetadata: TableFullMetadata | undefined,
  entities: DraftEntity[]
) => {
  let metadata_copy = cloneDeep(fullMetadata)

  entities.forEach((entity, i) => {
    if (entity.edited) {
      const entityName =
        entity !== null ? entity.entity?.entity_metadata?.name : null

      metadata_copy.column_metadata_list[i].entity_name = entityName
    }
  })
  return metadata_copy
}
