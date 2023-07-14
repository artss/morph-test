import { HTMLProps } from 'react';

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'ref' | 'as' | 'type'>;
