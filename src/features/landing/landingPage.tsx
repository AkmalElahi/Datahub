import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  outline: none;
`

const CreateDataButton = styled(Button)`
  background: none;
  border: 1px solid #272d34;
  max-width: 180px;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
`

const ViewDataButton = styled(Button)`
  color: #F8F8F8;
  background: #4D9EF6;
  min-width: 110px;
  margin-left: 10px;
`

export const LandingPage = () => {
  return (
    <div>
      <CreateDataButton>Create a New Data Product</CreateDataButton>
      <ViewDataButton>View My Data Products</ViewDataButton>
    </div>
  )
}