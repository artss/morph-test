import { theme } from '@/constants/theme';

export interface ThemeProps {
  theme: typeof theme;
}

export type ThemeColor = keyof (typeof theme)['colors'];

export const color = (name: ThemeColor) => (props: ThemeProps) =>
  props.theme.colors[name];
