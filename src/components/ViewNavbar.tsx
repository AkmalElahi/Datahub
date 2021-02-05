import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ViewNav = styled.div`
  background-color: #c4c4c4;
  height: 100px;
  width: 100vw;
  padding: 1rem 120px;
  margin-bottom: 2rem;
`

const SignUp = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
`

const SignUpText = styled.div`
  border-left: 1px solid #ffffff;
  padding-left: 1rem;
  color: #ffffff;
  font-size: 1.1em;
  font-weight: bold;
`

export const ViewNavbar = () => {
  return (
    <ViewNav>
      <SignUp>
        <SignUpText>Sign Up</SignUpText>
      </SignUp>
    </ViewNav>
  )
}
