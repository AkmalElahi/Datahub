import React from 'react'
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
  padding-right: 15px;
  border-right: 1px solid #3e4651;
`

const MyText = styled.span`
  opacity: 0.4;
  padding-left: 15px;
`

const SignUpText = styled.span`
  font-size: 18px;
  font-weight: 500;
  padding-left: 15px;
  border-left: 1px solid #3e4651;
  margin-left: auto;
`

const LogoPlaceholder = styled.span`
  font-size: 18px;
  font-weight: 300;
`

export const Navbar = () => {
  return (
    <FlexRow>
      <LeftColumn></LeftColumn>
      <RightColumn>
        <FlexRowInner>
          <FlexColumn style={{justifyContent: 'flex-start'}}>
            <LogoPlaceholder><b>DATA</b>HUB</LogoPlaceholder>
          </FlexColumn>
          <FlexColumn style={{justifyContent: 'center'}}>
            <div style={{display: 'flex'}}>
            <CreateText>Create Data Product</CreateText><MyText>My Data Products</MyText>
            </div>
          </FlexColumn>
          <FlexColumn style={{justifyContent: 'flex-end'}}>
            <SignUpText>Sign Up</SignUpText>
          </FlexColumn>
        </FlexRowInner>
      </RightColumn>
    </FlexRow>
  )
}