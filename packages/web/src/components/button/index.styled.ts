import styled from 'styled-components';
import { color } from '@/utils/styled';

export const ButtonS = styled.button`
  height: 48px;
  border: 0;
  border-radius: 24px;
  padding: 0 24px;
  font-size: 18px;
  background-color: ${color('buttonBackground')};
  color: ${color('buttonText')};
  cursor: pointer;

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
