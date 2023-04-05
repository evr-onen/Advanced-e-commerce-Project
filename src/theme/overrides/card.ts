// ** MUI Imports
import { TypographyPropsVariantOverrides } from "@mui/material"
import { Theme } from "@mui/material"

const Card = (theme: Theme) => {
  return {
    MuiCard: {
      defaultProps: {
        elevation: 10,
      },
      styleOverrides: {
        root: {},
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {},
        title: {
          lineHeight: 1.6,
          fontWeight: 500,
          fontSize: "5.1rem",
        },
        action: {
          marginTop: 0,
          marginRight: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "& + .MuiCardContent-root": {},
          "&:last-of-type": {},
          "& + .MuiCardActions-root": {},
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          "&.card-action-dense": {
            ".MuiCard-root .MuiCardMedia-root + &": {},
            ".MuiCard-root &:first-of-type": {
              "& + .MuiCardContent-root": {},
              "& + .MuiCardHeader-root": {},
            },
          },
          "& .MuiButton-text": {},
        },
      },
    },
  }
}

export default Card
