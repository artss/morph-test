import { createGlobalStyle } from 'styled-components';
import { color } from '@/utils/styled';
import { fonts } from './fonts';

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  * {
    box-sizing: border-box;
  }

  html {
    all: initial;
    background: ${color('bodyBackground')};
    color: ${color('textPrimary')};
    font-family: Elina, sans-serif;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    margin: 0;
  }

  h1 {
    font-size: 24px;
    font-weight: normal;
  }

  
  input {
    color: ${color('inputText')};
  }
  
  a {
    color: ${color('linkText')};
  }
`;
