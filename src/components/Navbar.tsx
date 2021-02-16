import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Popup from 'reactjs-popup'

import { DataSourcePopup } from './DataSourcePopup'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 0 1.5rem 0;
`

const FlexRowInner = styled(FlexRow)`
  border-bottom: 1px solid #3e4651;
  align-items: center;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const LeftColumn = styled(FlexColumn)`
  flex: 1;
  padding-left: 50px;
`

const RightColumn = styled(FlexColumn)`
  flex: 8;
  padding-right: 120px;
`

const ProductCreateLink = styled.span<{ active: boolean }>`
  font-size: 1.125rem;
  padding-right: 1.5rem;
  border-right: 1px solid #3e4651;
  cursor: pointer;
  opacity: 0.4;
  color: #000000;
  ${(props) =>
    props.active &&
    css`
      font-weight: 500;
      opacity: 1;
    `};
`

const ProductListLink = styled(NavLink)`
  opacity: 0.4;
  padding-left: 1.5rem;
  cursor: pointer;
  font-size: 1.125rem;
  color: #000000;
`

const SignUpText = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 1.5rem;
  margin-left: auto;
`

const LogoPlaceholder = styled.span`
  font-size: 1.125rem;
  font-weight: 300;
  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
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

export const Navbar = () => {
  const { productSlug } = useParams()
  return (
    <FlexRow>
      <LeftColumn></LeftColumn>
      <RightColumn>
        <FlexRowInner>
          <FlexColumn style={{ justifyContent: 'flex-start' }}>
            <LogoPlaceholder>
              <Link to="/">
                <b>DATA</b>HUB
              </Link>
            </LogoPlaceholder>
          </FlexColumn>
          <FlexColumn style={{ justifyContent: 'center' }}>
            <div style={{ display: 'flex' }}>
              <StyledPopup
                trigger={
                  <ProductCreateLink active={productSlug !== undefined}>
                    Create Data Product
                  </ProductCreateLink>
                }
                modal
              >
                {(close) => (
                  <DataSourcePopup
                    close={close}
                    uploadType="data"
                    dataType="product"
                  />
                )}
              </StyledPopup>
              <ProductListLink
                to="/my-products"
                activeStyle={{ fontWeight: '500', opacity: '1' }}
              >
                My Data Products
              </ProductListLink>
            </div>
          </FlexColumn>
          <FlexColumn style={{ justifyContent: 'flex-end' }}>
            <SignUpText>Sign Up</SignUpText>
          </FlexColumn>
        </FlexRowInner>
      </RightColumn>
    </FlexRow>
  )
}
