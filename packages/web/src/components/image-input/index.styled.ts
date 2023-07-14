import styled from 'styled-components';
import { color } from '@/utils/styled';

export const ImageUploadForm = styled.form`
  position: relative;
  width: 240px;
  min-height: 240px;
`;

export const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 240px;
  color: ${color('textSecondary')};
  border: dashed 1px ${color('border')};
  border-radius: 4px;
`;

export const ImagePlaceholderText = styled.div`
  font-size: 18px;
  text-align: center;
  color: ${color('textPrimary')};
`;

export const FileInput = styled.input.attrs(() => ({ type: 'file' }))`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 240px;
  opacity: 0;
  cursor: pointer;
`;

export const ImageS = styled.img`
  display: block;
  width: 100%;
  height: 240px;
  object-fit: contain;
  border-radius: 8px;
  overflow: hidden;
`;

export const FileError = styled.div`
  color: ${color('errorText')};
  padding: 8px;
  text-align: center;
`;

export const FileReset = styled.button.attrs(() => ({ type: 'button' }))`
  display: block;
  width: 100%;
  padding: 8px;
  border: 0;
  outline: 0;
  font-size: 14px;
  background-color: transparent;
  color: ${color('linkText')};
  cursor: pointer;
`;

export const FileDescription = styled.div`
  padding: 8px;
  font-size: 13px;
  text-align: center;
  color: ${color('textSecondary')};
`;
