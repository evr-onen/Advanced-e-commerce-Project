// ** MUI Imports
import { Theme } from "@mui/material/styles"

const select = (theme: Theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // "&.Mui-selected": {
          //   background: "#4d4ddc",
          //   color: "#fdf2f2",
          // },
        },
      },
    },
  }
}
export default select
