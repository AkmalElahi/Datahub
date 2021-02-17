import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { DraftMetadata } from './viewSlice'
import { postViewMetadata } from './viewSlice'

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
  draftMetadata: DraftMetadata
  handleSubmit: ReturnType<typeof useForm>['handleSubmit']
}

export const ViewHeader = ({
  viewType,
  productTitle,
  draftMetadata,
  handleSubmit,
}: Props) => {
  const dispatch = useDispatch()
  const onSubmitView = (data) => {
    console.log('test')
    if (draftMetadata.edited) {
      dispatch(postViewMetadata(draftMetadata.metadata))
    }
  }

  return (
    <FlexRow>
      <ProductHeader>{productTitle}</ProductHeader>
      <ViewTypeBox>{viewType}</ViewTypeBox>
      <FlexColumn>
        <ButtonGroup>
          <AddDataButton>Add View</AddDataButton>
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
