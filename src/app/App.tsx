import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/Theme'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { DataProductPage } from '../features/dataProduct/dataProductPage'

import './App.css';

const App: React.FC = () => {

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <DataProductPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
