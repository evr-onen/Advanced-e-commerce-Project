import { Box, Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material"
import React from "react"

const index = () => {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Grid container className="insideWrapper" justifyContent="center">
      <Grid item xs={12} px="4rem">
        <Grid container columnSpacing={4}>
          dashboard
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index
