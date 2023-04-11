// ** CSS
import "../styles/globals.css"
import { EmotionCache } from "@emotion/react"

// ** Types
import type { AppProps } from "next/app"
import { FC, useEffect, useState } from "react"

// ** MUI imports
import { Grid } from "@mui/material"

// ** Create Theme
import PageProvider from "src/theme/helpers/PageProvider"

// ** Toaster
import { Toaster } from "react-hot-toast"

// ** Components Imports
import Header from "src/components/sections/Header"
import Footer from "src/components/sections/Footer"
// ** Context API
import { GlobalContextProvider } from "src/contexts/globalContext"

// ** Lang
import "src/config/i18n"

import SideNav from "src/components/SideNav"
export interface MUIAppProps extends AppProps {
  emotionCache?: EmotionCache
}
import { useRouter } from "next/router"
const App: FC<MUIAppProps> = ({ Component, pageProps, emotionCache }) => {
  const [firstRoute, setFirstRoute] = useState<string | null>(null)
  let router = useRouter()
  const { asPath } = useRouter()

  useEffect(() => {
    setFirstRoute(asPath.split("/")[1])
  }, [asPath])

  return (
    <PageProvider emotionCache={emotionCache}>
      <GlobalContextProvider>
        <Grid container spacing={4}>
          {/* {router.pathname !== "/" && (
            <Grid item xs={12}>
              <Header />
            </Grid>
          )}{" "} */}
          {firstRoute !== "login" && (
            <Grid item xs={12}>
              <Header />
            </Grid>
          )}

          {firstRoute === "admin-panel" ? (
            <Grid item xs={12}>
              <SideNav>
                <Component {...pageProps} />
              </SideNav>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Component {...pageProps} />
            </Grid>
          )}
          {firstRoute !== "login" && (
            <Grid item xs={12}>
              <Footer />
            </Grid>
          )}
        </Grid>

        <Toaster toastOptions={{ position: "top-right", className: "react-hot-toast" }} />
      </GlobalContextProvider>
    </PageProvider>
  )
}

export default App
