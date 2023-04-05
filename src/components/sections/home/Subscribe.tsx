// ** MUI Imports
import { Box, Button, Grid, InputAdornment, TextField, Typography, useTheme } from "@mui/material"

// ** Icons
import { GoMailRead } from "react-icons/go"

const SubscribeBlock = () => {
  const theme = useTheme()
  return (
    <Grid container rowSpacing={4} p="1.25rem" sx={{ background: "#F4F4F4" }}>
      <Grid item xs={12}>
        <Typography variant="h6" textAlign="center" textTransform="uppercase" fontWeight="700">
          SUBSCRIBE NEWSLETTER
        </Typography>
      </Grid>
      <Grid item textAlign="center" xs={12}>
        <Typography>Get all the latest information on Events, Sales and Offers.</Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <TextField
          sx={{ mx: "10%", "& .MuiOutlinedInput-root": { borderRadius: "50px", background: "#fff" } }}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Box mr="0.625rem">
                  <GoMailRead fontSize="1.25rem" />
                </Box>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: { borderRadius: "250px", color: "secondary" },
          }}
        />
      </Grid>
      <Grid item xs={12} display="flex">
        <Button variant="contained" sx={{ color: "white", background: theme.palette.primary?.main, mx: "auto" }}>
          <Typography textTransform="uppercase" fontWeight={700}>
            subscribe
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default SubscribeBlock
