import { ReactNode } from 'react';

export type ImageUploadProps = {
  name?: string;
  onChange?: (base64: string | undefined) => void;
  error?: ReactNode;
  className?: string;
};
