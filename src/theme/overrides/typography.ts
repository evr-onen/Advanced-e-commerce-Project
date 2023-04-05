// ** MUI Imports
import { Theme } from "@mui/material/styles"

const Typography = (theme: Theme) => {
  return {
    MuiTypography: {
      styleOverrides: {
        h5: {
          /* fontSize: "26px",
          color: "#6ba354", */
        },
      },
    },
  }
}
export default Typography
