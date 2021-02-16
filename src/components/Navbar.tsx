import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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

const CreateText = styled.span<{ active: boolean }>`
  font-size: 18px;
  padding-right: 1.5rem;
  border-right: 1px solid #3e4651;
  cursor:pointer;
  opacity: 0.4;
  color:#000000
  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.primaryColor};
      font-weight: 500;
      opacity:1
    `}
`

const MyText = styled.span<{ active: boolean }>`
  opacity: 0.4;
  padding-left: 1.5rem;
  cursor:pointer
  ${(props) =>
    props.active &&
    css`
      color: ${props.theme.primaryColor};
      font-weight: 500;
      opacity: 1;
    `}
`

const SignUpText = styled.span`
  font-size: 18px;
  font-weight: 500;
  padding-left: 1.5rem;
  margin-left: auto;
`

const LogoPlaceholder = styled.span`
  font-size: 18px;
  font-weight: 300;
  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
`

export const Navbar = (props) => {
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
              <CreateText active={props.isHome} onClick={() => props.openModal && props.openModal()}>Create Data Product</CreateText>
              <Link to="/my-products" style={{ color: '#000000' }}>
                <MyText active={!props.isHome}>My Data Products</MyText>
              </Link>
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
