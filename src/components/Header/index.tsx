// ** React Core
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// ** Theme Imports
import { useTheme } from "next-themes"

// ** MUI Imports
import { Card, CardContent, Grid, IconButton } from "@mui/material"

// ** Icons
const UIWeatherSunny = dynamic(() => import("mdi-material-ui/WeatherSunny"), { ssr: false })
const UIWeatherNight = dynamic(() => import("mdi-material-ui/WeatherNight"), { ssr: false })

// ** Components
import LangDropdown from "./LangDropdown"

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <Grid item width="100%">
      <Grid container className="headerContainer">
        <Grid item width="100%" className="topHeaderWrapper">
          <Grid container className="insideWrapper" width="100%" maxWidth="1370px" justifyContent="center" mx="auto" sx={{ background: "lightGray" }}>
            <Grid item width="100%" px="2rem">
              <Grid container spacing={5} justifyContent="space-between">
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item xs={4}>
                  <Grid container spacing={5} justifyContent="flex-end">
                    <Grid item>
                      <IconButton color="inherit" aria-label="themeBtn" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                        {resolvedTheme === "light" ? <UIWeatherNight /> : <UIWeatherSunny />}
                      </IconButton>
                      <LangDropdown />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="insideWrapper" width="100%" maxWidth="1370px" justifyContent="center" mx="auto">
            <Grid item xs={12} px="2rem">
              <Grid container spacing={5} justifyContent="space-between">
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item></Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
