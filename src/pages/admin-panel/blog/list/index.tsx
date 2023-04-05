import { Grid } from "@mui/material"
import React from "react"

const index = () => {
  return (
    <Grid container className="insideWrapper" justifyContent="center">
      <Grid item xs={12} px="4rem">
        <Grid container columnSpacing={4}>
          list blog
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index
