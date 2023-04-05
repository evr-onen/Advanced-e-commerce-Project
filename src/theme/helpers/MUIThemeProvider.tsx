import { useTheme } from "next-themes"
import { GlobalStyles } from "@mui/material"
import { CssBaseline, ThemeProvider, ThemeOptions } from "@mui/material"
import { darkTheme, globalStyles, lightTheme } from ".."
import { FC, useEffect, useState } from "react"

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<ThemeOptions>(lightTheme)

  useEffect(() => {
    resolvedTheme === "light" ? setCurrentTheme(lightTheme) : setCurrentTheme(darkTheme)
  }, [resolvedTheme])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  )
}

export default MUIThemeProvider
