import { createTheme } from '@mui/material/styles';

const MyLightThemes = createTheme({
  palette: {
    mode: 'light',
  },
});

const MyDarkThemes = createTheme({
  palette: {
    mode: 'dark',
  },
});

export { MyDarkThemes, MyLightThemes };
