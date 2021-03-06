import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {ProductFullMetadata, ViewMetadata, ViewPossibleForView} from '../../gen/api/api'
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
  product_full_metadata: ProductFullMetadata | undefined
  reset: ReturnType<typeof useForm>['reset']
  register: ReturnType<typeof useForm>['register']
}

export const ViewMetadataSection = ({
  metadata,
  possibleViews,
  product_full_metadata,
  reset,
  register,
}: Props) => {
  useEffect(() => { reset() }, [reset, metadata])
  let renderColumnOptions = product_full_metadata?.table_full_metadata_list?.find(
      (tblFllMtd) => tblFllMtd.table_metadata?.name === metadata?.table_name)?.column_metadata_list?.map((c) => (
    <option value={c.name || ''} key={c.name}>
      {c.title}
    </option>
  ))

  let renderedMetadata

  if (metadata?.card_view) {
    renderedMetadata = (
      <React.Fragment>
        <FlexRow>
            <UList style={{ width: '100%' }}>
                <List>
                    <Label>Title</Label>
                    <Input
                        name="title"
                        key={metadata?.card_view.title}
                        defaultValue={metadata?.card_view.title || ''}
                        ref={register}
                    />
                </List>
            </UList>
        </FlexRow>

        <FlexRow>
          <FlexColumn style={{ marginRight: '10px' }}>
            <UList>
              <List>
                <Label>Title Column</Label>
                <Dropdown
                    name="title_column"
                    key={metadata?.card_view.title_column}
                    defaultValue={metadata?.card_view.title_column || ''}
                    ref={register}
                >
                  <option value='' key=''></option>
                  {renderColumnOptions}
                </Dropdown>
              </List>
            </UList>
          </FlexColumn>
          <FlexColumn>
            <UList>
              <List>
                <Label>Subtitle Column</Label>
                <Dropdown
                    name="subtitle_column"
                    key={metadata?.card_view.subtitle_column}
                    defaultValue={metadata?.card_view.subtitle_column || ''}
                    ref={register}
                >
                  <option value='' key=''></option>
                  {renderColumnOptions}
                </Dropdown>
              </List>
            </UList>
          </FlexColumn>
        </FlexRow>

        <FlexRow>
          <FlexColumn style={{ marginRight: '10px' }}>
            <UList>
              <List>
                <Label>Description Column</Label>
                <Dropdown
                    name="description_column"
                    key={metadata?.card_view.description_column}
                    defaultValue={metadata?.card_view.description_column || ''}
                    ref={register}
                >
                  <option value='' key=''></option>
                  {renderColumnOptions}
                </Dropdown>
              </List>
            </UList>
          </FlexColumn>
          <FlexColumn>
            <UList>
              <List>
                <Label>Image Column</Label>
                <Dropdown
                    name="image_url_column"
                    key={metadata?.card_view.image_url_column}
                    defaultValue={metadata?.card_view.image_url_column || ''}
                    ref={register}
                >
                  <option value='' key=''></option>
                  {renderColumnOptions}
                </Dropdown>
              </List>
            </UList>
          </FlexColumn>
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
              <Input
                  name="title"
                  key={metadata?.table_view.title}
                  defaultValue={metadata?.table_view.title || ''}
                  ref={register}
              />
            </List>
          </UList>
        </FlexColumn>
        <FlexColumn>
          <UList>
            <List>
              <Label>Subtitle</Label>
              <Input
                  name="subtitle"
                  key={metadata?.table_view.subtitle}
                  defaultValue={metadata?.table_view.subtitle || ''}
                  ref={register}
              />
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
                ref={register}
              />
            </List>
          </UList>
        </FlexRow>
        <NavLabel>
          <input
            type="checkbox"
            name="top_level_nav"
            style={{ marginRight: '10px' }}
            defaultChecked={metadata?.table_view.top_level_nav === true}
            ref={register}
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
                <Label>Name</Label>
                <Input value={metadata?.name || 'none'} disabled />
              </List>
            </UList>
          </FlexColumn>
          <FlexColumn>
            <UList>
              <List>
                <Label>Table</Label>
                <Input value={metadata?.table_name || 'none'} disabled />
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
