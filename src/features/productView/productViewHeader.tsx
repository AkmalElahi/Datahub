import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { currentTab } from '../product/tabDisplaySlice'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
`

const ViewsGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-transform: uppercase;
  padding-inline-start: 0;
  color: #a8a8a8;
`

const LinksGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-inline-start: 0;
  color: #a8a8a8;
  justify-content: flex-end;
`

const ViewLink = styled.li`
  cursor: pointer;
  padding: 0 1rem;
  :not(:last-child) {
    border-right: 1px solid #3e4651;
  }
`

const View = styled.li<{ active: boolean }>`
  cursor: pointer;
  margin-right: 2rem;

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.secondaryColor};
      font-weight: 500;
    `}
`

interface Props {
  viewTitles: (string | null | undefined)[] | undefined
  setTab: (tab: currentTab) => void
}

export const ProductViewHeader = ({ viewTitles, setTab }: Props) => {
  const { tab } = useSelector((state: RootState) => state.tabDisplay)

  const handleTabChange = (view) => {
    if (tab !== view) setTab({ tab: view })
  }

  const renderedViews = viewTitles?.map((view, i) => (
    <View
      active={tab === view}
      onClick={() => handleTabChange(view)}
      key={view}
    >
      {view}
    </View>
  ))
  return (
    <FlexRow>
      <ViewsGroup>{renderedViews?.reverse()}</ViewsGroup>
      <LinksGroup>
        <ViewLink style={{ color: '#181d23' }}>Download as</ViewLink>
        <ViewLink>Embed to website</ViewLink>
        <ViewLink>API</ViewLink>
        <ViewLink>Visualize</ViewLink>
        <ViewLink>Alert</ViewLink>
      </LinksGroup>
    </FlexRow>
  )
}
