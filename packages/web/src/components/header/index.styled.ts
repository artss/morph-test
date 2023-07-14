import styled from 'styled-components';
import { color } from '@/utils/styled';
import { ReactComponent as LogoS } from '@/assets/logo.svg';

export const HeaderRoot = styled.div`
  padding: 32px 48px;
  background-color: ${color('headerBackground')};
`;

export const Logo = styled(LogoS)`
  width: 150px;
`;

export const Title = styled.h1`
  font-size: 120px;
  text-align: center;
`;
