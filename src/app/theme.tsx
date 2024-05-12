import { ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
    fontFamily: 'Poppins',
    h1: {
      fontFamily: 'Kanit',
    },
    h2: {
      fontFamily: 'Kanit',
    },
    h3: {
      fontFamily: 'Kanit',
    },
    h4: {
      fontFamily: 'Kanit',
    },
    h5: {
      fontFamily: 'Kanit',
    },
    h6: {
      fontFamily: 'Kanit',
    },
  };

export const themeLight: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#af2eff',
    },
    secondary: {
      main: '#358a00',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
    },
  },
  typography: typography
};

export const themeDark: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#af2eff',
      },
      secondary: {
        main: '#358a00',
      },
      text: {
        primary: '#050505',
        secondary: '#050505',
        disabled: '#050505',
      },
    },
    typography: typography
};