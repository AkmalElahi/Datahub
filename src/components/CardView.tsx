import React from 'react'
import styled from 'styled-components'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
`

const FlexColumn = styled.div`
  display: flex;
  flex-basis: 100%;
  flex: 1;
`

const LeftColumn = styled(FlexColumn)`
  flex: 1;
  padding: 25px;
`

const RightColumn = styled(FlexColumn)`
  flex: 3;
  padding: 25px;
`

const CardBody = styled.div``

const ImagePlaceholder = styled.div`
  background-color: #c4c4c4;
  width: 100%;
  height: 400px;
`

const DataWrapper = styled.div`
  width: 100%;
`

const DataRow = styled(FlexRow)`
  padding: 0.8rem 0;
  border-bottom: 1px solid #cfcfcf;
`

const DataColumn = styled.div`
  display: flex;
  font-weight: bold;
  padding-right: 0.5rem;
`

const DataValue = styled.div`
  display: flex;
`

interface Props {
  columnHeaders: (string | undefined)[]
  data: string[] | undefined
  isPreview: boolean
}

export const CardView = ({ columnHeaders, data, isPreview }: Props) => {
  let renderedData: JSX.Element[] = []

  for (let x = 0; x < columnHeaders.length; x++) {
    renderedData.push(
      <DataRow key={x}>
        <DataColumn>{columnHeaders[x]}</DataColumn>
        <DataValue>{data?.[x] || ''}</DataValue>
      </DataRow>
    )
  }
  return (
    <CardBody>
      <FlexRow>
        <LeftColumn>
          <ImagePlaceholder></ImagePlaceholder>
        </LeftColumn>
        <RightColumn>
          <DataWrapper>{renderedData}</DataWrapper>
        </RightColumn>
      </FlexRow>
    </CardBody>
  )
}
