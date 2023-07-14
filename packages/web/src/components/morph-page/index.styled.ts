import styled from 'styled-components';
import { color } from '@/utils/styled';

export const StatusLabel = styled.div`
  margin: 32px;
  text-align: center;
`;

export const ErrorText = styled.div`
  margin: 32px;
  text-align: center;
  color: ${color('errorText')};
`;

export const ResultImagesRoot = styled.div`
  margin: 48px;
`;

export const ResultTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 32px;
`;

export const ResultImagesS = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const ResultImage = styled.img`
  display: block;
`;
