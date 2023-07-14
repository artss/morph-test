import { HeaderProps } from './types';
import { HeaderRoot, Logo, Title } from './index.styled';

export function Header({ title }: HeaderProps) {
  return (
    <HeaderRoot>
      <a href="https://creaition.io/">
        <Logo />
      </a>

      {title && <Title>{title}</Title>}
    </HeaderRoot>
  );
}
