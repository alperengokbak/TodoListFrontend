import { createTheme } from "@mui/material/styles";

const colors = {
  black: "#000000",
  green: "#357a38",
  white: "#FFFFFF",
  spanGray: "rgb(83, 100, 113)",
};
export const MyThemeProvider = createTheme({
  palette: {
    primary: {
      main: colors.black,
    },
    secondary: {
      main: colors.green,
    },
    third: {
      main: colors.white,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: colors.white,
          backgroundColor: colors.green,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: colors.white,
          backgroundColor: colors.green,
        },
      },
    },
  },
});
