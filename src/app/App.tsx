import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../styles/Theme'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { TableListPage } from '../features/tableList/tableListPage'

import './App.css';

const App: React.FC = () => {

  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <header className="App-header">
        <TableListPage />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
