// ** Reaxt / Next Core
import React, { ReactNode } from "react"
import { useRouter } from "next/router"

// ** MUI imports
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material"
// ** Icons
import { BsBoxSeam, BsTags, BsImages, BsWrench, BsChatRightText, BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"

// ** Types
interface PropsType {
  children: ReactNode
}

const Index = (props: PropsType) => {
  const { children } = props

  // ** States
  const [open, setOpen] = React.useState(true)

  // ** Calls
  const theme = useTheme()
  const router = useRouter()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"))
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Grid container className="insideWrapper" justifyContent="center" mx="auto">
      <Grid item xs={12} px={isLarge ? "1rem" : "4rem"}>
        <Grid container columnSpacing={4}>
          {!isLarge && (
            <Grid item minWidth="333px">
              <Card>
                <CardContent>
                  <Box border="0.5px solid" borderColor={theme.palette.primary.main} p="1rem">
                    <List sx={{ maxWidth: "300px", width: "100%" }} component="nav" aria-labelledby="nested-list-subheader">
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          my: "0.25rem",
                          height: "1.75rem",
                          lineHeight: "27px",
                          borderRadius: "10px",
                          backgroundColor: theme.palette.secondary.light,
                        }}
                      >
                        Dashboard
                      </ListSubheader>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/dashboard"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/dashboard")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/dashboard/users"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/dashboard/users")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/dashboard/permisions"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/dashboard/permisions")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="Permissions" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/dashboard/messages"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/dashboard/messages")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                      </ListItemButton>
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          my: "0.25rem",
                          height: "1.75rem",
                          lineHeight: "27px",
                          borderRadius: "10px",
                          backgroundColor: theme.palette.secondary.light,
                        }}
                      >
                        Blog
                      </ListSubheader>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/blog/create"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/blog/create")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="Create" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/blog/list"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/blog/list")
                        }}
                      >
                        <ListItemIcon>
                          <BsChatRightText />
                        </ListItemIcon>
                        <ListItemText primary="List" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/blog/blog-category"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/blog/blog-category")
                        }}
                      >
                        <ListItemIcon>
                          <BsTags />
                        </ListItemIcon>
                        <ListItemText primary="Blog Category" />
                      </ListItemButton>
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          my: "0.25rem",
                          height: "1.75rem",
                          lineHeight: "27px",
                          borderRadius: "10px",
                          backgroundColor: theme.palette.secondary.light,
                        }}
                      >
                        Create
                      </ListSubheader>

                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/create/product"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/create/product")
                        }}
                      >
                        <ListItemIcon>
                          <BsBoxSeam />
                        </ListItemIcon>
                        <ListItemText primary="Product" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/create/category"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/create/category")
                        }}
                      >
                        <ListItemIcon>
                          <BsTags />
                        </ListItemIcon>
                        <ListItemText primary="Category" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/create/variant"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/create/variant")
                        }}
                      >
                        <ListItemIcon>
                          <BsTags />
                        </ListItemIcon>
                        <ListItemText primary="Variant" />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/create/properties"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/create/properties")
                        }}
                      >
                        <ListItemIcon>
                          <BsTags />
                        </ListItemIcon>
                        <ListItemText primary="Properties" />
                      </ListItemButton>

                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          my: "0.25rem",
                          height: "1.75rem",
                          lineHeight: "27px",
                          borderRadius: "10px",
                          backgroundColor: theme.palette.secondary.light,
                        }}
                      >
                        Site Options
                      </ListSubheader>
                      <ListItemButton
                        sx={{ borderRadius: "1rem", m: "0.5rem", height: "2.25rem" }}
                        selected={router.asPath === "/admin-panel/options"}
                        onClick={(e) => {
                          e.preventDefault
                          router.push("/admin-panel/options")
                        }}
                      >
                        <ListItemIcon>
                          <BsWrench />
                        </ListItemIcon>
                        <ListItemText primary="Site Options" />
                      </ListItemButton>
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item width={!isLarge ? "calc(100% - 400px)" : "100%"}>
            <Card>
              <CardContent>
                <Box sx={{ border: "0.5px solid lightGrey" }} width="100%" height="auto" display="flex" justifyContent="center">
                  {children}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
