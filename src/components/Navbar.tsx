import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const CreateText = styled.span`
  font-size: 18px;
  font-weight: 500;
  padding-right: 1.5rem;
  border-right: 1px solid #3e4651;
`

const MyText = styled.span`
  opacity: 0.4;
  padding-left: 1.5rem;
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

export const Navbar = () => {
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
              <CreateText>Create Data Product</CreateText>
              <MyText>My Data Products</MyText>
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
