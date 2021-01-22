import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { RootState } from '../../app/rootReducer'

import { currentTab } from './tabDisplaySlice'

const SidebarGroup = styled.ul`
  display: block;
  padding-top: 2rem;
  list-style: none;
  font-size: 18px;
  padding-inline-start: 0;
  letter-spacing: 1px;
`

const DataGroup = styled.div`
  padding-left: 10px;
`

const SidebarLink = styled.li<{ active: boolean }>`
  margin: 15px 0;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.primaryColor};
      font-weight: 500;
    `}
`

const DataSource = styled.li`
  margin: 15px 0;
  font-size: 14px;
  cursor: pointer;
`

const DataSourceSelected = styled(DataSource)`
  color: ${(props) => props.theme.primaryColor};
  font-weight: 500;
`

interface Props {
  setTab: (tab: currentTab) => void
}

export const ProductSidebar = ({ setTab }: Props) => {
  const { tab } = useSelector((state: RootState) => state.tabDisplay)
  return (
    <SidebarGroup>
      <SidebarLink
        active={tab === 'data'}
        onClick={() => setTab({ tab: 'data' })}
      >
        Data
      </SidebarLink>
      <DataGroup>
        <DataSource>Source 01</DataSource>
        <DataSource>Source 02</DataSource>
        <DataSource>Source 03</DataSource>
      </DataGroup>
      <SidebarLink
        active={tab === 'views'}
        onClick={() => setTab({ tab: 'views' })}
      >
        Views
      </SidebarLink>
      <SidebarLink
        active={tab === 'publish'}
        onClick={() => setTab({ tab: 'publish' })}
      >
        Publish
      </SidebarLink>
    </SidebarGroup>
  )
}
