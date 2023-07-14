import { css } from 'styled-components';
import elinaFont from '@/assets/Eina03-Regular.084ad9bd755c32a2.ttf';

export const fonts = css`
  @font-face {
    font-family: 'Elina';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Elina Regular'), local('Elina-Regular'),
      url(${elinaFont}) format('truetype');
  }
`;
