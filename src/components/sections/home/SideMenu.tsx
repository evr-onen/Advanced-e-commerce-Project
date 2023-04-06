// ** Core
import { useState } from "react"

// ** MUI Imports
import { Box, Grid, MenuItem, MenuList, Typography, useTheme } from "@mui/material"

// ** Icons
import { GiLargeDress, GiMicrophone } from "react-icons/gi"
import { MdOutlineElectricalServices, MdSportsTennis } from "react-icons/md"
import { AiFillGift } from "react-icons/ai"
import { RiPlantFill } from "react-icons/ri"

// ** Dummy data
import { sideBarObj } from "src/dummyData/sideBar"

// ** Types
type SectionType = {
  [key: string]: TmpContainerType
}

type ProductType = {
  id: number
  title: string
  mainCat: string
  cats: string[]
  price: { tr: string; en: string }
}

type TmpContainerType = {
  [key: string]: ProductType[]
}

const SideMenu = () => {
  // ** States
  const [data, setData] = useState(sideBarObj)
  const [sideBarData, setSetSideBarData] = useState<SectionType | null>()

  const theme = useTheme()

  // ** Render Funcs
  const renderIcon = (data: string) => {
    switch (data) {
      case "Fashion":
        return <GiLargeDress />
      case "Electronics":
        return <MdOutlineElectricalServices />
      case "Gifts":
        return <AiFillGift />
      case "Home & Garden":
        return <RiPlantFill />
      case "Music":
        return <GiMicrophone />
      default:
        break
    }
  }

  const renderMenu = () => {
    let tmpContainer: SectionType = {}
    data.map((sectionProducts) => {
      tmpContainer[sectionProducts.section] = {}
      sectionProducts.products.map((product) => {
        if (!tmpContainer[sectionProducts.section].hasOwnProperty(product.mainCat)) {
          tmpContainer[sectionProducts.section][product.mainCat] = [product]
        } else {
          tmpContainer[sectionProducts.section][product.mainCat].push(product)
        }
      })
    })

    return Object.keys(tmpContainer as SectionType).map((section, index) => {
      return (
        <MenuItem
          key={index}
          component="li"
          divider
          sx={{ position: "relative", "&:hover div": { scale: "1", visibility: "visible", opacity: "1", left: "100%", transition: "200ms" } }}
        >
          {renderIcon(section)} <Typography sx={{ ml: "1rem" }}>{section}</Typography>
          <Grid
            container
            p="1rem"
            sx={{
              zIndex: "100",
              boxShadow: " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
              width: "31.25rem",
              scale: "0.85",
              py: 0,
              border: "0.5px solid rgba(0, 0, 0, 0.12)",
              visibility: "hidden",
              opacity: "0",
              position: "absolute",
              left: "90%",
              top: 0,
              background: theme.palette.background.paper,
            }}
          >
            {Object.keys(tmpContainer[section]).map((mainCat, i) => {
              return (
                <Grid key={i} item sx={{ padding: "1.5625rem" }} xs={6}>
                  <Typography variant="subtitle1" fontWeight="700" textTransform="uppercase" textAlign="center" color={theme.palette.text.primary}>
                    {mainCat}
                  </Typography>
                  <Grid container flexDirection="column" alignContent="center">
                    {tmpContainer[section][mainCat].map((product, ind) => {
                      return (
                        <Grid key={ind} item>
                          {product.cats[0]}
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </MenuItem>
      )
    })
  }

  return (
    <Box sx={{ py: 0, border: "0.5px solid rgba(0, 0, 0, 0.12)", background: theme.palette.background.paper }}>
      <MenuList component="ul" sx={{ py: 0 }}>
        {renderMenu()}
      </MenuList>
    </Box>
  )
}

export default SideMenu
