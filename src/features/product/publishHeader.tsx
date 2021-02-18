import React from 'react'
import styled from 'styled-components'

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

const SaveButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  min-width: 110px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

const PublishButton = styled(Button)`
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
`

interface Props {
  productTitle: string
  isPublished: boolean
}

export const PublishHeader = ({ productTitle, isPublished }: Props) => {
  return (
    <FlexRow>
      <FlexColumn>
        <h1 style={{ margin: '0' }}>{productTitle}</h1>
      </FlexColumn>
      <FlexColumn>
        <ButtonGroup>
          <SaveButton type="submit">Save</SaveButton>
          <PublishButton type="submit">
            {isPublished ? 'Unpublish' : 'Publish'}
          </PublishButton>
        </ButtonGroup>
      </FlexColumn>
    </FlexRow>
  )
}
