import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1e3c72' },
    secondary: { main: '#ffeb3b' },
    text: { primary: '#ffffff' },
  },
  typography: {
    fontFamily: 'Poppins, Arial',
  },
});

export default theme;
