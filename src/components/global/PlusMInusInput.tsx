import { Grid, IconButton, InputAdornment, TextField, useTheme } from "@mui/material"
import React, { forwardRef, useRef, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

interface PropsType {
  isDisable?: boolean
  width: number
  iconSize: number
  height: number
  padY: number
  takeQuantity: (quantityData: number) => void
  defaultQuantity: number
}

const PlusMInusInput = forwardRef((props: PropsType, inputRef) => {
  const { isDisable, width, iconSize, height, padY, takeQuantity, defaultQuantity } = props

  // ** Calls
  const theme = useTheme()

  // ** States
  const [quantity, setQuantity] = useState<number>(defaultQuantity)

  // ** Ref
  const quantityRef = useRef<HTMLInputElement>()

  // ** Functions
  const makePlus = () => {
    setQuantity((prev) => prev + 1)
    takeQuantity(quantity + 1)
  }
  const makeMinus = () => {
    if (Number(quantityRef.current?.value) > 0) {
      setQuantity((prev) => prev - 1)
      takeQuantity(quantity - 1)
    }
  }

  // width, fontSize, height, padY, takeQuantity
  return (
    <Grid item xs={12} sm={4} textAlign="center">
      <TextField
        sx={{ width: `${width}px`, mx: "10%", "& .MuiOutlinedInput-root": { borderRadius: "50px", background: "#fff", px: 0 } }}
        autoComplete="off"
        type="number"
        value={quantity}
        /* disabled={!isDisable} */
        inputRef={quantityRef}
        onChange={(e) => setQuantity(Number(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={makeMinus} /* disabled={!isDisable} */>
                <FaMinus fontSize={`${iconSize}px`} color={theme.palette.customColors?.darkText} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={makePlus} /* disabled={!isDisable} */>
                <FaPlus fontSize={`${iconSize}px`} color={theme.palette.customColors?.darkText} />
              </IconButton>
            </InputAdornment>
          ),
          sx: { color: theme.palette.customColors?.darkText, "& input": { fontSize: `${height}px`, py: `${padY}px`, textAlign: "center" } },
        }}
      />
    </Grid>
  )
})
PlusMInusInput.displayName = "PlusMInusInput"
export default PlusMInusInput
