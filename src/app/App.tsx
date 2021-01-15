import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/Theme'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { Navbar } from '../components/Navbar'
import { DataProductPage } from '../features/dataProduct/dataProductPage'

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
        <DataProductPage />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
