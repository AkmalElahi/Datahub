import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/Theme'

import { Navbar } from '../components/Navbar'
import { LandingPage } from '../features/landing/landingPage'
//import { ProductListPage } from '../features/productList/ProductListPage'
import { ProductPage } from '../features/product/productPage'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f8f8f8;
  }
`

const AppContainer = styled.div`
  font-family: ${props => props.theme.fontFamily}
`

const App: React.FC = () => {

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/*<Route path='/my-products' element={<ProductListPage />} />*/}
          <Route path='/:productSlug' element={<ProductPage />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
