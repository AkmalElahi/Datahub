import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { DraftMetadata } from './viewSlice'
import { postViewMetadata } from './viewSlice'
import cloneDeep from "lodash/cloneDeep";
import { ProductFullMetadata } from '../../gen/api/api'
import { AddViewPopup } from "../../components/AddViewPopup";
import Popup from "reactjs-popup";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
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

const AddDataButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  max-width: 180px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

const SaveButton = styled(Button)`
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
`

const StyledPopup = styled(Popup)`
  &-content {
    border: none;
    border-radius: 8px;
    max-width: 480px;

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

const ProductHeader = styled.h1`
  margin: 0;
  padding-right: 1.5rem;
  border-right: 1px solid #3e4651;
`

const ViewTypeBox = styled.div`
  border: 1px solid #4d9ef6;
  color: #4d9ef6;
  font-weight: bold;
  border-radius: 4px;
  padding: 8px 15px;
  display: inline-flex;
  margin-left: 1.5rem;
`

const ToggleInput = styled.input`
  overflow: visible;
  margin: 0;
`

const ToggleLabel = styled.label``

interface Props {
  viewType: string
  productTitle: string
  productFullMetadata: ProductFullMetadata
  draftMetadata: DraftMetadata
  handleSubmit: ReturnType<typeof useForm>['handleSubmit']
}

export const ViewHeader = ({
  viewType,
  productTitle,
  productFullMetadata,
  draftMetadata,
  handleSubmit,
}: Props) => {
  const dispatch = useDispatch()
  const onSubmitView = (data) => {
    console.log('test')
    let fullMetadata = cloneDeep(draftMetadata.metadata)
    if (fullMetadata?.card_view) {
      fullMetadata.card_view.title = data.title
      fullMetadata.card_view.title_column = (data.title_column != '')?data.title_column:null
      fullMetadata.card_view.subtitle_column = (data.subtitle_column != '')?data.subtitle_column:null
      fullMetadata.card_view.description_column = (data.description_column != '')?data.description_column:null
      fullMetadata.card_view.image_url_column = (data.image_url_column != '')?data.image_url_column:null
    } else if (fullMetadata?.table_view) {
      fullMetadata.table_view.title = data.title
      fullMetadata.table_view.subtitle = data.subtitle
      fullMetadata.table_view.description = data.description
      fullMetadata.table_view.top_level_nav = data.top_level_nav
    }
    dispatch(postViewMetadata(fullMetadata))
  }

  return (
    <FlexRow>
      <ProductHeader>{productTitle}</ProductHeader>
      <ViewTypeBox>{viewType}</ViewTypeBox>
      <FlexColumn>
        <ButtonGroup>
          <StyledPopup
              trigger={<AddDataButton>Add View</AddDataButton>}
              modal
          >
            {(close) => (
                <AddViewPopup
                    close={close}
                    productFullMetadata={productFullMetadata}
                />
            )}
          </StyledPopup>
          <SaveButton
            type="submit"
            name="submit"
            onClick={handleSubmit(onSubmitView)}
          >
            Save
          </SaveButton>
        </ButtonGroup>
      </FlexColumn>
    </FlexRow>
  )
}
