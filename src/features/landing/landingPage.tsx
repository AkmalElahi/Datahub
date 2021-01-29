import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { DataSourcePopup } from '../../components/DataSourcePopup'

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
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
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

export const LandingPage = () => {
  return (
    <React.Fragment>
      <StyledPopup
        trigger={<CreateDataButton>Create a New Data Product</CreateDataButton>}
        modal
      >
        {(close) => <DataSourcePopup close={close} addType="product" />}
      </StyledPopup>
      <Link to="/my-products">
        <ViewDataButton>View My Data Products</ViewDataButton>
      </Link>
    </React.Fragment>
  )
}
