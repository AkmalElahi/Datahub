import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import { ViewMetadata, ViewPossibleForView } from '../../gen/api/api'
import { ColumnsPopup } from '../../components/ColumnsPopup'

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

const StyledPopup = styled(Popup)`
  &-content {
    border: none;
    border-radius: 8px;
    max-width: 740px;
    overflow: auto;
    max-height: 100%;

    .modal {
      padding: 2rem;

      >.close {
        cursor: pointer;
        position: absolute;
        display: block;
        padding: 2px 5px;
        right: 20px;
        font-size: 36px;
        font-weight: 600;
        border: none;
        background-color: transparent;
        outline: none;
      }
      >.header {
        font-size: 2em;
        font-weight: 500;
        margin-bottom: 1rem;
      }
  }
`

const Button = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  outline: none;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const EditButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  max-width: 180px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

interface Props {
  metadata: ViewMetadata | undefined
  possibleViews: ViewPossibleForView | undefined
  register: ReturnType<typeof useForm>['register']
}

export const ViewMetadataSection = ({
  metadata,
  possibleViews,
  register,
}: Props) => {
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
      <h2>Data</h2>
      <form>
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
      </form>
      <ButtonGroup>
        <StyledPopup trigger={<EditButton>Edit</EditButton>} modal lockScroll>
          {(close) => (
            <ColumnsPopup
              close={close}
              metadata={metadata}
              possibleViews={possibleViews}
            />
          )}
        </StyledPopup>
      </ButtonGroup>
    </React.Fragment>
  )
}
