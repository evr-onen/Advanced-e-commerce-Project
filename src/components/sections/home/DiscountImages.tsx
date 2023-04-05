// **Core
import Image from "next/legacy/image"

// ** MUI Imports
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Static Images... They will remove for dynamic images
import Image1 from "public/images/discount/shop1_home_ads1.jpg"
import Image2 from "public/images/discount/shop1_home_ads2.jpg"
import Image3 from "public/images/discount/shop1_home_ads3.jpg"

const DiscountImages = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Grid container justifyContent="space-between" alignItems="center" wrap={isSmall ? "wrap" : "nowrap"} gap={2}>
      <Grid item xs={12} position="relative" sx={{ background: "#ECECEC" }} display="flex" justifyContent="center">
        <Image src={Image1} height={170} objectFit="contain" />
        <Typography variant="h5" fontWeight={700} sx={{ position: "absolute", top: "10%", left: "20%" }}>
          Porto Watches
        </Typography>
        <Box sx={{ position: "absolute", top: "25%", left: "17%" }} display="flex" alignItems="center" justifyContent="center">
          <Typography sx={{ textDecoration: "line-through" }} fontWeight={700} variant="h6">
            20%
          </Typography>
          <Typography ml={1} fontWeight={700} variant="h3">
            30%
          </Typography>
          <Typography ml={1} fontWeight={900} variant="h4">
            OFF
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} position="relative" sx={{ background: "#ECECEC" }} display="flex" justifyContent="center">
        <Image src={Image2} quality={100} height={170} objectFit="contain" />
        <Typography variant="h5" fontWeight={700} sx={{ position: "absolute", top: "30%", left: "30%" }}>
          DEAL PROMOS
        </Typography>
        <Typography variant="body1" fontWeight={700} sx={{ position: "absolute", top: "50%", left: "33%" }}>
          STARTING AT $99
        </Typography>
      </Grid>
      <Grid item xs={12} position="relative" sx={{ background: "#ECECEC" }} display="flex" justifyContent="center">
        <Image src={Image3} quality={100} height={170} objectFit="contain" />
        <Typography variant="h5" fontWeight={700} sx={{ position: "absolute", top: "15%", left: "42%" }}>
          Handbags
        </Typography>
        <Typography variant="h6" fontWeight={500} sx={{ position: "absolute", top: "38%", left: "47%" }}>
          STARTING AT $99
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DiscountImages
