import { ButtonProps } from './types';
import { ButtonS } from './index.styled';

export function Button(props: ButtonProps) {
  return <ButtonS {...props} />;
}
