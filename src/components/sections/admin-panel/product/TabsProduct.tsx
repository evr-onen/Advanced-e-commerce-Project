// ** Core
import * as React from "react"

// ** MUI Imports
import { Tabs, Tab, Typography, Box } from "@mui/material"

// ** Components
import TabProperties from "./TabProperties"

// ** Types
import { ProductType } from "@/types/createProduct"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface PropsType {
  productData: ProductType
}

// ** External Functions
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const TabsProduct = (props: PropsType) => {
  const { productData } = props

  // ** States
  const [value, setValue] = React.useState(0)

  // ** Handle Funcs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Under Construction
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabProperties productData={productData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Under Construction
      </TabPanel>
    </Box>
  )
}

export default TabsProduct
