import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
}

const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '1000px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '1000px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '1000px',
    backgroundColor: 'pink.4',
  },
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    '*': scrollbarStyles,
    'html, body': {
      fontFamily: 'body',
      fontWeight: '400',
      scrollBehavior: 'smooth',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
    },
    a: {
      WebkitAppearance: 'none',
      WebkitTapHighlightColor: 'transparent',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      UserSelect: 'none',
    },
    svg: {
      ':active, :focus': {
        backgroundColor: 'none',
      },
    },
    'input, textarea': {
      '::selection': {
        backgroundColor: '#D8246C',
        color: '#ffffff',
        border: '1px solid #D8246C',
      },
      '::-moz-selection': {
        backgroundColor: '#D8246C',
        color: '#ffffff',
      },
      WebkitAppearance: 'none',
      caretColor: '#D8246C',
    },
  }),
}

const theme = extendTheme({
  config,
  styles,
  breakpoints,
  colors: {
    // TODO удалить brand
    brand: {
      black: '#1a202c',
      white: '#ffffffeb',
      pink: '#FF8DBB',
      pink2: '#E87CA7',
      french: '#FFE8DC',
    },
    pink: {
      primary: '#D8246C',
      1: '#E05089',
      2: '#E87CA7',
      3: '#F3BDD3',
      4: '#FBE9F0',
      5: '#FFFBFC',
    },
    overlay: 'rgba(0, 0, 0, 0.5)',
    green: '#74B91D',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
})

export default theme
