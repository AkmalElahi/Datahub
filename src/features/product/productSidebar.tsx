import React from 'react'
import styled from 'styled-components'

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

const SidebarLink = styled.li`
  margin: 15px 0;
  cursor: pointer;
`

const SidebarLinkSelected = styled(SidebarLink)`
  color: ${(props) => props.theme.primaryColor};
  font-weight: 500;
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

export const ProductSidebar = () => {
  return (
    <SidebarGroup>
      <SidebarLinkSelected>Data</SidebarLinkSelected>
      <DataGroup>
        <DataSourceSelected>Source 01</DataSourceSelected>
        <DataSource>Source 02</DataSource>
        <DataSource>Source 03</DataSource>
      </DataGroup>
      <SidebarLink>Views</SidebarLink>
      <SidebarLink>Publish</SidebarLink>
    </SidebarGroup>
  )
}
