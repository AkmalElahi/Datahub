import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string,
    secondaryColor: string,
    fontFamily: string,
    fontSizes: object
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: '#4d9ef6',
  secondaryColor: '#181d23',
  fontFamily: 'Roboto',
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em'
  }
}