// ** MUI Imports
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Components
import CatList from "@/components/sections/admin-panel/CatList"

// ** Contex
import { useGlobalContext } from "@/contexts"

// **Sweet Alert
import useSwal from "@/hooks/useSwal"
const Swal = useSwal
import toast from "react-hot-toast"

// ** Vars
let tmpArr: { id: number; label: string }[] = []

const Index = () => {
  const { sectionCategory, setSectionCategory, mainCategory, setMainCategory, subCategory, setSubCategory, products } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** handler Fonks
  const catEditDeleteHandler = (catData: { id: number; label: string }, listType: string, action: string) => {
    tmpArr = []
    console.log(listType)
    switch (listType) {
      case "section":
        tmpArr = [...sectionCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
          setSectionCategory(tmpArr)
          toast.success("Category Changed!", {
            duration: 2000,
          })
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
          setSectionCategory(tmpArr)
          toast.success("Category Created!", {
            duration: 2000,
          })
        } else {
          if (canItDelete(catData.id, "section")) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                tmpArr = tmpArr.filter((item) => item.id !== catData.id)
                setSectionCategory(tmpArr)
                Swal.fire("Deleted!", "The Category has been deleted.", "success")
                toast.success("The Category has been deleted.", {
                  duration: 2000,
                })
              }
            })
          }
        }

        break
      case "main":
        tmpArr = [...mainCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
          setMainCategory(tmpArr)
          toast.success("Category Changed!", {
            duration: 2000,
          })
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
          setMainCategory(tmpArr)
          toast.success("Category Created!", {
            duration: 2000,
          })
        } else {
          if (canItDelete(catData.id, "main")) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                tmpArr = tmpArr.filter((item) => item.id !== catData.id)
                setMainCategory(tmpArr)
                Swal.fire("Deleted!", "The Category has been deleted.", "success")
                toast.success("The Category has been deleted.", {
                  duration: 2000,
                })
              }
            })
          }
        }
        break

      case "sub":
        tmpArr = [...subCategory]
        if (action === "edit") {
          tmpArr.find((item) => item.id === catData.id)!.label = catData.label
          setSubCategory(tmpArr)
          toast.success("Category Changed!", {
            duration: 2000,
          })
        } else if (action === "create") {
          tmpArr = [...tmpArr, { id: catData.id, label: catData.label }]
          setSubCategory(tmpArr)
          toast.success("Category Created!", {
            duration: 2000,
          })
        } else {
          if (canItDelete(catData.id, "sub")) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                tmpArr = tmpArr.filter((item) => item.id !== catData.id)
                setSubCategory(tmpArr)
                Swal.fire("Deleted!", "The Category has been deleted.", "success")
                toast.success("The Category has been deleted.", {
                  duration: 2000,
                })
              }
            })
          }
        }
        break

      default:
        break
    }
  }

  const canItDelete = (id: number, catType: string) => {
    switch (catType) {
      case "section":
        if (products.findIndex((product) => product.section_cat.id === id) === -1) return true
        break
      case "main":
        if (products.findIndex((product) => product.main_cat.id === id) === -1) return true
        break
      case "sub":
        if (products.findIndex((product) => product.sub_cat.id === id) === -1) return true
        break
    }
    return false
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
            <CatList data={sectionCategory} setFunction={catEditDeleteHandler} dataName="Section" canItDelete={canItDelete} />
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
            <CatList data={mainCategory} setFunction={catEditDeleteHandler} dataName="Main" canItDelete={canItDelete} />
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
            <CatList data={subCategory} setFunction={catEditDeleteHandler} dataName="Sub" canItDelete={canItDelete} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
