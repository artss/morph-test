import { ThemeProvider } from 'styled-components';
import { theme } from '@/constants/theme';
import { SocketProvider } from '@/contexts/socket';
import { Header } from '@/components/header';
import { MorphPage } from '@/components/morph-page';
import { GlobalStyle } from './global-style';
import { Page, PageBody } from './index.styled';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <SocketProvider>
        <Page>
          <Header title="morph" />

          <PageBody>
            <MorphPage />
          </PageBody>
        </Page>
      </SocketProvider>
    </ThemeProvider>
  );
}
