"use client";

import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import {CacheProvider} from '@chakra-ui/next-js'
import React, {Suspense} from 'react'
import {Provider} from 'react-redux'
import {store} from '../redux/store'
import theme from "../../src/styles/theme";

const Providers = ({children}: { children: React.ReactNode }) => {

  return (
    <Suspense fallback={""}>
        <Provider store={store}>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                  {children}
              </ChakraProvider>
            </CacheProvider>
        </Provider>
    </Suspense>
  );
};
export default Providers;
