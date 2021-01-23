import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { RootState } from '../../app/rootReducer'
import { TableFullMetadata } from 'typescript-axios'

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

const DataSource = styled.li<{ active: boolean }>`
  margin: 15px 0;
  font-size: 14px;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.primaryColor};
      font-weight: 500;
    `}
`

interface Props {
  sources?: TableFullMetadata[]
  setSource: (source: number) => void
  setTab: (tab: currentTab) => void
}

export const ProductSidebar = ({ sources, setSource, setTab }: Props) => {
  const { tab, source } = useSelector((state: RootState) => state.tabDisplay)

  const handleSourceChange = (index) => {
    setSource(index)
    if (tab !== 'data') setTab({ tab: 'data' })
  }

  const renderedSources = sources?.map((s, index) => (
    <DataSource
      active={tab === 'data' && source === index}
      onClick={() => handleSourceChange(index)}
      key={s?.table_metadata?.name}
    >
      {s?.table_metadata?.title}
    </DataSource>
  ))
  return (
    <SidebarGroup>
      <SidebarLink
        active={tab === 'data'}
        onClick={() => setTab({ tab: 'data' })}
      >
        Data
      </SidebarLink>
      <DataGroup>{renderedSources}</DataGroup>
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
