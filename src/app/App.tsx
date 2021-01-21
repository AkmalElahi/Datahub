import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { lightTheme } from '../styles/Theme'
import { Navbar } from '../components/Navbar'

import { UserCredentials } from 'typescript-axios'
import { fetchUser } from '../features/user/userSlice'
import { LandingPage } from '../features/landing/landingPage'
import { ProductListPage } from '../features/productList/productListPage'
import { ProductPage } from '../features/product/productPage'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f8f8f8;
  }
`

const AppContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
`
const user: UserCredentials = {
  email: process.env.REACT_APP_TEST_EMAIL,
  password: process.env.REACT_APP_TEST_PW,
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
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-products" element={<ProductListPage />} />
          <Route path="/:productSlug" element={<ProductPage />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
