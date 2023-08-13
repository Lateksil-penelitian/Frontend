import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '../themes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.Fragment>
      <ChakraProvider theme={theme}>
        <NextNProgress
          height={5}
          color="#3182ce"
          options={{ showSpinner: false }}
        />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}

export default MyApp;
