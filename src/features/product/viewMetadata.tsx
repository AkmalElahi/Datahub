import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ViewMetadata } from 'typescript-axios'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const UList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: 10px;
  padding-inline-start: 0;
`

const List = styled.li`
  display: flex;
`

const Label = styled.label`
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-right: none;
  box-sizing: border-box;
  border-radius: 6px 0 0 6px;
  padding: 16px 20px;
`

const NavLabel = styled.label``

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`

interface Props {
  metadata: ViewMetadata | undefined
  register: ReturnType<typeof useForm>['register']
  errors: ReturnType<typeof useForm>['errors']
}

//type InputEvent = ChangeEvent<HTMLInputElement>
//type ChangeHandler = (event: InputEvent) => void

export const ViewMetadataSection = ({ metadata, register, errors }: Props) => {
  //const [currentKey, setCurrentKey] = useState('0')

  //const handleChange: ChangeHandler = event => {
  //  setCurrentKey(event.target.value)
  //}
  let renderTitleOptions = metadata?.card_view?.column_view_list?.map((c) => (
    <option value={c.title || ''} key={c.title}>
      {c.title}
    </option>
  ))

  let renderedMetadata

  if (metadata?.card_view) {
    renderedMetadata = (
      <React.Fragment>
        <FlexRow style={{ paddingBottom: '10px' }}>
          <Label>Title Column</Label>
          <Dropdown name="cardMetadata" id="titleDropdown">
            {renderTitleOptions}
          </Dropdown>
        </FlexRow>

        <FlexRow style={{ paddingBottom: '10px' }}>
          <Label>Subtitle Column</Label>
          <Dropdown name="cardMetadata" id="subtitleDropdown">
            {renderTitleOptions}
          </Dropdown>
        </FlexRow>

        <FlexRow style={{ paddingBottom: '10px' }}>
          <Label>Description Column</Label>
          <Dropdown name="cardMetadata" id="descDropdown">
            {renderTitleOptions}
          </Dropdown>
        </FlexRow>

        <FlexRow style={{ paddingBottom: '10px' }}>
          <Label>Image Column</Label>
          <Dropdown name="cardMetadata" id="imgDropdown">
            {renderTitleOptions}
          </Dropdown>
        </FlexRow>
      </React.Fragment>
    )
  } else if (metadata?.table_view) {
    renderedMetadata = (
      <FlexRow>
        <FlexColumn style={{ marginRight: '10px' }}>
          <UList>
            <List>
              <Label>Title</Label>
              <Input value={metadata?.table_view.title || ''} />
            </List>
          </UList>
        </FlexColumn>
        <FlexColumn>
          <UList>
            <List>
              <Label>Subtitle</Label>
              <Input value={metadata?.table_view.subtitle || ''} />
            </List>
          </UList>
        </FlexColumn>
        <FlexRow>
          <UList style={{ width: '100%' }}>
            <List>
              <Label>Description</Label>
              <Input
                name="description"
                key={metadata?.table_view.description}
                defaultValue={metadata?.table_view.description || ''}
              />
            </List>
          </UList>
        </FlexRow>
        <NavLabel>
          <input
            type="checkbox"
            name="showNav"
            style={{ marginRight: '10px' }}
            value="true"
            defaultChecked={true}
          />
          Show in navigation bar
        </NavLabel>
      </FlexRow>
    )
  }

  return (
    <React.Fragment>
      <h1>Data</h1>
      <FlexRow>
        <FlexColumn style={{ marginRight: '10px' }}>
          <UList>
            <List>
              <Label>Table</Label>
              <Input value={metadata?.table_name || 'none'} disabled />
            </List>
          </UList>
        </FlexColumn>
        <FlexColumn>
          <UList>
            <List>
              <Label>Name</Label>
              <Input value={metadata?.name || 'none'} disabled />
            </List>
          </UList>
        </FlexColumn>
      </FlexRow>
      {renderedMetadata}
    </React.Fragment>
  )
}
