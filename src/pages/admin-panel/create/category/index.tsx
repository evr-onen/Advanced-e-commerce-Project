// ** MUI Imports
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Components
import CatList from "@/components/sections/admin-panel/CatList"

// ** Contex
import { useGlobalContext } from "@/contexts"

const index = () => {
  const { sectionCategory, setSectionCategory, mainCategory, setMainCategory, subCategory, setSubCategory } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** handler Fonks
  const catEditDeleteHandler = (catData: { id: number; label: string }, listType: string, action: string) => {
    let tmpArr = []
    switch (listType) {
      case "section":
        tmpArr = [...sectionCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
        } else {
          tmpArr = tmpArr.filter((item) => item.id !== catData.id)
        }
        setSectionCategory(tmpArr)

        break
      case "main":
        tmpArr = [...mainCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
        } else {
          tmpArr = tmpArr.filter((item) => item.id !== catData.id)
        }
        setMainCategory(tmpArr)
        break
      case "sub":
        tmpArr = [...subCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
        } else {
          tmpArr = tmpArr.filter((item) => item.id !== catData.id)
        }
        setSubCategory(tmpArr)
        break

      default:
        break
    }
  }

  return (
    <Grid container className="insideWrapper" justifyContent="center" width="100%" spacing={1}>
      <Grid item xs={12} sm={8} md={8} lg={4} mb={8}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" fontWeight="700" color="initial">
              Section Categories
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CatList data={sectionCategory} setFunction={catEditDeleteHandler} dataName="Section" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={4} mb={8}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" fontWeight="700" color="initial">
              Main Categories
            </Typography>
          </Grid>
          <Grid item md={12}>
            <CatList data={mainCategory} setFunction={catEditDeleteHandler} dataName="Main" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={4}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center" fontWeight="700" color="initial">
              Section Categories
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CatList data={subCategory} setFunction={catEditDeleteHandler} dataName="Sub" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index
