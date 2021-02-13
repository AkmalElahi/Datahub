import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useForm, useFieldArray } from 'react-hook-form'

import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

import {
  ColumnViewMetadata,
  ViewMetadata,
  ViewPossibleForView,
  NestedViewMetadata,
} from '../gen/api/api'
import { draftMetadata } from '../features/product/viewSlice'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
`

const UList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: 10px;
  padding-inline-start: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`

const List = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
`
const BottomList = styled(List)`
  height: 53px;
`

const Label = styled.label`
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-right: 0.625rem;
  min-width: 6.25rem;
`

const CheckLabel = styled.label`
  margin-right: 2rem;
`

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.25rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 6px;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 6px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const DoneButton = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
  height: 50px;
`
const CancelButton = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  background: transparent;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
  height: 50px;
`

const AddColumnButton = styled.div`
  cursor: pointer;
  color: #4d9ef6;
  font-weight: bold;
  margin-bottom: 1rem;
`

const DeleteButton = styled.div`
  cursor: pointer;
  color: #4d9ef6;
  margin-bottom: 1rem;
`

const Separator = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid rgba(196, 196, 196, 0.5);
`

interface Props {
  close: any
  metadata: ViewMetadata | undefined
  possibleViews: ViewPossibleForView | undefined
}

interface Data {
  column: ColumnViewMetadata
  outside: boolean
  nested?: NestedViewMetadata
}

export const ColumnsPopup = ({ close, metadata, possibleViews }: Props) => {
  const dispatch = useDispatch()
  const view = metadata?.card_view ? metadata?.card_view : metadata?.table_view
  const possibleProducts = possibleViews?.possible_additional_product_table_list
  const possibleNestedViews = possibleViews?.possible_product_nested_view_list
  const possibleColumns = possibleViews?.possible_column_list

  // Initial data setup for field array
  let dataSetup: Data[] | undefined = view?.column_view_list?.map((col) => ({
    column: col,
    outside: col.product_name !== metadata?.product_name,
  }))
  let nestedSetup =
    metadata?.card_view?.nested_view_list?.map(
      (nestedView) =>
        ({
          column: {},
          outside: false,
          nested: nestedView,
        } as Data)
    ) || []

  dataSetup?.push(...nestedSetup)

  const { register, watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      columns: dataSetup,
    },
  })

  const [currentProducts, setCurrentProducts] = useState(
    dataSetup?.map((col) => col.column.product_name) || []
  )

  const [currentNestedProducts, setCurrentNestedProducts] = useState(
    dataSetup?.map((col) => col.nested || null)
  )
  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: 'columns',
  })

  // Submit handler. Rolls up all form data into a ViewMetadata object to be saved to DraftMetadata state
  const onSubmit = (data) => {
    // On click view. Easiest to pull on click data directly from the <select> string
    let splitNames = data.columns.map((column) => {
      const temp = column.on_click_view?.column_name?.split('/')
      if (temp)
        return {
          product_name: temp?.[0],
          column_name: temp?.[1],
          view_name: temp?.[2],
        }
      else return null
    })
    let splitNestedView = data.columns.map((column) => {
      const temp = column.nested?.view_name?.split('/')
      if (temp)
        return {
          product_name: column.nested.product_name,
          view_name: temp?.[0],
          column_name_from: temp?.[1],
          column_name_to: temp?.[2],
        }
      else return null
    })
    // List of column metadata
    let removeNested = fields.filter((field, i) => !data.columns[i].nested)
    let newColumns = removeNested.map((field, i) => {
      if (!data.columns[i].nested)
        return {
          ...field.column,
          ...data.columns[i],
          on_click_view: splitNames[i]
            ? {
                ...splitNames[i],
              }
            : null,
        } as ColumnViewMetadata
      else return null
    })
    // List of nested metadata
    let flattened = splitNestedView.filter((view) => view)
    let newNested = flattened.map((column) => {
      return {
        product_name: column.product_name,
        view_name: column.view_name,
        column_name_from: column.column_name_from,
        column_name_to: column.column_name_to,
      }
    })
    // Combine into ViewMetdata
    let submitMetadata = {
      ...metadata,
      ...(metadata?.card_view && {
        card_view: {
          ...metadata.card_view,
          column_view_list: newColumns,
          nested_view_list: newNested,
        },
      }),
      ...(metadata?.table_view && {
        table_view: { ...metadata.table_view, column_view_list: newColumns },
      }),
    } as ViewMetadata
    dispatch(draftMetadata({ metadata: submitMetadata, edited: true }))
    close()
  }

  // Handle adding a new column, outside or not
  const handleAdd = (isOutside: boolean) => {
    let newMetadata: ColumnViewMetadata | undefined = {}
    if (!isOutside) {
      newMetadata = view?.column_view_list?.[0]
    } else {
      if (!isEmpty(possibleProducts)) {
        const tempColumn =
          possibleProducts?.[0].possible_table_list?.[0]
            .possible_column_list?.[0]
        newMetadata = {
          add_filter: false,
          column_name: tempColumn?.column_name,
          column_name_from: undefined,
          column_name_to: undefined,
          on_click_view: undefined,
          product_name: tempColumn?.product_name,
          table_name: tempColumn?.table_name,
          title: tempColumn?.title,
        }
      }
    }
    const newCol = { column: newMetadata, outside: isOutside }
    if (isOutside) {
      if (!isEmpty(possibleProducts)) {
        setCurrentProducts([
          ...currentProducts,
          possibleProducts?.[0].product_metadata?.name,
        ])
        append(newCol)
      }
    } else {
      setCurrentProducts([
        ...currentProducts,
        dataSetup?.[0].column.product_name,
      ])
      append(newCol)
    }
  }

  // Handle adding nested view
  const handleAddNested = () => {
    let newMetadata: NestedViewMetadata | undefined = {}
    let possibleView = possibleNestedViews?.[0].possible_view_list?.[0]
    newMetadata = {
      product_name: possibleView?.view_metadata?.product_name,
      view_name: possibleView?.view_metadata?.name,
      column_name_from: possibleView?.column_name_from,
      column_name_to: possibleView?.column_name_to,
    }
    const newCol = { nested: newMetadata }

    if (currentNestedProducts)
      setCurrentNestedProducts([...currentNestedProducts, newMetadata])
    append(newCol)
  }

  // Column dropdown change handler. Update fields array to store correct name and title
  const handleColumnChange = (v, i) => {
    const title = view?.column_view_list?.find((c) => c.column_name === v)
    setValue(`columnName${i}`, v)
    setValue(`columns[${i}].title`, title?.title)
    setValue(`on_click_view${i}`, null)
    const temp = cloneDeep(fields[i])
    temp.column.column_name = v
    temp.column.column_title = title?.title
    temp.column.on_click_view = null
    remove(i)
    insert(i, temp)
  }

  // Nested view handler. Use local state to keep track of each field's selected nested product
  const handleNestedChange = (v, i) => {
    let newMetadata: NestedViewMetadata | undefined = {}
    let possibleView = possibleNestedViews?.find(
      (view) => view.product_metadata?.name === v
    )?.possible_view_list?.[0]
    newMetadata = {
      product_name: possibleView?.view_metadata?.product_name,
      view_name: possibleView?.view_metadata?.name,
      column_name_from: possibleView?.column_name_from,
      column_name_to: possibleView?.column_name_to,
    }

    if (currentNestedProducts) {
      setCurrentNestedProducts([
        ...currentNestedProducts.slice(0, i),
        newMetadata,
        ...currentNestedProducts.slice(i + 1, currentNestedProducts.length),
      ])
    }
  }

  // Rendered on click view options for dropdown. Requires column name
  const ClickList = (v) => {
    let renderedClickList
    let col = possibleColumns?.find((c) => c.column_name === v.value)

    if (col?.possible_on_click_list) {
      renderedClickList = col?.possible_on_click_list.map((column) => {
        return (
          <option
            value={`${column?.view_metadata?.product_name}/${column?.column_name_to}/${column?.view_metadata?.name}`}
            key={column?.view_metadata?.name}
          >{`${column?.view_metadata?.product_name}/${column?.column_name_to}/${column?.view_metadata?.name}`}</option>
        )
      })
    } else renderedClickList = <option></option>
    return renderedClickList
  }

  // Rendered product options for dropdown
  let renderedProducts = possibleProducts?.map((product) => (
    <option
      value={product?.product_metadata?.name}
      key={product?.product_metadata?.name}
    >
      {product?.product_metadata?.name}
    </option>
  ))

  // Rendered column options for dropdown
  let renderedOptions = possibleViews?.possible_column_list?.map((col) => (
    <option value={col.column_name} key={col.column_name}>
      {col.column_name}
    </option>
  ))

  // Rendered nested products options for dropdown
  let renderedNestedProducts = possibleNestedViews?.map((view) => (
    <option
      value={view.product_metadata?.name}
      key={view.product_metadata?.name}
    >
      {view.product_metadata?.name}
    </option>
  ))

  // Rendered table options for dropdown. Selection is based on product name
  const selectTables = (product: string) => {
    let index = possibleProducts?.findIndex(
      (element) => element?.product_metadata?.name === product
    )
    if (index !== undefined && index !== -1) {
      return possibleProducts?.[index].possible_table_list?.map((table) => (
        <option
          value={table?.table_metadata?.name}
          key={table?.table_metadata?.name}
        >
          {table?.table_metadata?.name}
        </option>
      ))
    } else return
  }

  // Rendered nested table options for dropdown. Selection is based on product name
  const selectNestedTables = (product: string, key: number) => {
    let index = possibleNestedViews?.findIndex(
      (element) => element?.product_metadata?.name === product
    )
    if (index !== undefined && index !== -1) {
      return possibleNestedViews?.[index].possible_view_list?.map(
        (table, i) => (
          <option
            value={`${table?.view_metadata?.name}/${table?.column_name_from}/${table?.column_name_to}`}
            key={`${table?.view_metadata?.name}/${table?.column_name_from}/${table?.column_name_to}`}
          >
            {`${table?.view_metadata?.name}/${table?.column_name_from}/${table?.column_name_to}`}
          </option>
        )
      )
    } else return
  }

  // Add proper forms to renderedForm based on contents of field array.
  const watchColumns = watch('columns')
  let renderedForm: JSX.Element[] = []
  fields?.forEach((col, key) => {
    const watchClickable = watch(`on_click_view${key}`)
    renderedForm.push(
      <ButtonGroup>
        <DeleteButton
          onClick={() => {
            if (fields.length > 1) remove(key)
          }}
        >
          Delete
        </DeleteButton>
      </ButtonGroup>
    )
    col.nested &&
      renderedForm.push(
        <React.Fragment>
          <UList>
            <List>
              <Label>Nested Product</Label>
              <Dropdown
                name={`columns[${key}].nested.product_name`}
                ref={register()}
                defaultValue={currentNestedProducts?.[key]?.product_name || ''}
                onChange={(event) =>
                  handleNestedChange(event.target.value, key)
                }
              >
                {renderedNestedProducts}
              </Dropdown>
            </List>
          </UList>
          <UList>
            <List>
              <Label>Nested View</Label>
              <Dropdown
                name={`columns[${key}].nested.view_name`}
                ref={register()}
                defaultValue={`${currentNestedProducts?.[key]?.view_name}/${currentNestedProducts?.[key]?.column_name_from}/${currentNestedProducts?.[key]?.column_name_to}`}
              >
                {selectNestedTables(
                  currentNestedProducts?.[key]?.product_name || '',
                  key
                )}
              </Dropdown>
            </List>
          </UList>
          <Separator />
        </React.Fragment>
      )
    col.outside &&
      renderedForm.push(
        <div key="outsideCol">
          <UList>
            <List>
              <Label>Data Product</Label>
              <Dropdown
                name={`columns[${key}].product`}
                defaultValue={col.column.product_name}
                ref={register()}
              >
                {renderedProducts}
              </Dropdown>
            </List>
          </UList>
          <UList>
            <List>
              <Label>Table</Label>
              <Dropdown
                name={`columns[${key}].table`}
                defaultValue={col.column.table_name}
                ref={register()}
              >
                {selectTables(currentProducts[key] || '')}
              </Dropdown>
            </List>
          </UList>
        </div>
      )
    !col.nested &&
      renderedForm.push(
        <div key={col.id}>
          <UList>
            <List>
              <Label>Column</Label>
              <Dropdown
                name={`columns[${key}].column_name`}
                defaultValue={col.column.column_name}
                ref={register()}
                onChange={(event) =>
                  handleColumnChange(event.target.value, key)
                }
              >
                {renderedOptions}
              </Dropdown>
            </List>
          </UList>
          <UList>
            <List>
              <Label>Name</Label>
              <Input
                name={`columnName${key}`}
                defaultValue={watchColumns?.[key].column?.column_name}
                ref={register()}
                disabled
              />
            </List>
          </UList>
          <UList>
            <List>
              <Label>Title</Label>
              <Input
                name={`columns[${key}].title`}
                defaultValue={watchColumns?.[key].column?.title || ''}
                ref={register()}
              />
            </List>
          </UList>
          <UList>
            <BottomList>
              <CheckLabel>
                <Input
                  type="checkbox"
                  name={`on_click_view${key}`}
                  defaultChecked={col.column.on_click_view}
                  ref={register()}
                />
                On Click go to View
              </CheckLabel>
              {watchClickable && (
                <Dropdown
                  name={`columns[${key}].on_click_view.column_name`}
                  ref={register()}
                >
                  <ClickList value={col.column.column_name} />
                </Dropdown>
              )}
            </BottomList>
          </UList>
          <UList>
            <List>
              <CheckLabel>
                <Input
                  type="checkbox"
                  name={`columns[${key}].add_filter`}
                  defaultChecked={col.column.add_filter}
                  ref={register()}
                />
                Add Filter by Column
              </CheckLabel>
            </List>
          </UList>
          <Separator />
        </div>
      )
  })

  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header">Columns</div>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderedForm}
          <FlexRow>
            <FlexColumn>
              <AddColumnButton onClick={() => handleAdd(false)}>
                + Add New Column
              </AddColumnButton>
              <AddColumnButton onClick={() => handleAdd(true)}>
                + Add Column from Another Table or Data Product
              </AddColumnButton>
              {metadata?.card_view && (
                <AddColumnButton onClick={() => handleAddNested()}>
                  + Add Nested View
                </AddColumnButton>
              )}
            </FlexColumn>
            <ButtonGroup className="actions">
              <CancelButton
                onClick={() => {
                  close()
                }}
              >
                Cancel
              </CancelButton>
              <DoneButton name="columnsSubmit" type="submit" ref={register()}>
                Save
              </DoneButton>
            </ButtonGroup>
          </FlexRow>
        </form>
      </div>
    </div>
  )
}
