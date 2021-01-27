import { schema } from 'normalizr'

//TODO: shelve for now

export const tableMetadata = new schema.Entity(
  'table_metadata',
  {},
  {
    idAttribute: 'name',
  }
)

export const valueList = new schema.Entity(
  'column_values',
  {},
  {
    idAttribute: (entity, parent) => parent.table_metadata,
  }
)

export const columnList = new schema.Entity(
  'column_metadata',
  {},
  {
    idAttribute: (entity, parent) => parent.table_metadata,
  }
)

export const entityList = new schema.Entity(
  'entity_metadata_candidates',
  {},
  {
    idAttribute: (entity, parent) => parent.table_metadata,
  }
)

export const table = new schema.Entity(
  'tables',
  {
    table_metadata: tableMetadata,
    column_metadata_list: columnList,
    entity_metadata_candidate_list_list: entityList,
    value_list_list: valueList,
  },
  {
    idAttribute: (value) => value.table_metadata.name,
  }
)
