import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { lightTheme } from '../styles/Theme'

import { UserCredentials } from '../gen/api/api'
import { fetchUser } from '../features/user/userSlice'
import { LandingPage } from '../features/landing/landingPage'
import { ProductListPage } from '../features/productList/productListPage'
import { ProductPage } from '../features/product/productPage'
import { ProductViewPage } from '../features/productView/productViewPage'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f8f8f8;
  }

  html {
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }

  textarea {
    font-family: ${(props) => props.theme.fontFamily};  
  }

  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }
`

const AppContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
`
const user: UserCredentials = {
  email: 'test_user1@datahub.com',
  password: 'test1',
}

const App: React.FC = () => {
  const dispatch = useDispatch()
  const foundUser = localStorage.getItem('user')
  useEffect(() => {
    if (!foundUser) {
      dispatch(fetchUser(user))
    }
  }, [dispatch, foundUser])

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-products" element={<ProductListPage />} />
          <Route path="/constructor/:productSlug" element={<ProductPage />} />
          <Route path="/:productSlug" element={<ProductViewPage />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
