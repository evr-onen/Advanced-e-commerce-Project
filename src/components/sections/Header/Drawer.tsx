import * as React from "react"
import Box from "@mui/material/Box"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { Grid, Card, CardContent, ListSubheader } from "@mui/material"
import { useRouter } from "next/router"
import { BsBoxSeam, BsChatRightText, BsTags, BsWrench } from "react-icons/Bs"

interface PropsType {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
  isOpenDrawer: boolean
}

const Drawer = (props: PropsType) => {
  const { toggleDrawer, isOpenDrawer } = props

  // ** Calls
  const router = useRouter()

  const list = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Grid item minWidth="333px">
        <Card>
          <CardContent>
            <Box border="0.5px solid" /* borderColor={theme.palette.primary.main} */ p="1rem">
              <List /* sx={{ width: "300px" }} */ component="nav" aria-labelledby="nested-list-subheader">
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
                    // backgroundColor: theme.palette.secondary.light,
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
                    // backgroundColor: theme.palette.secondary.light,
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
                    // backgroundColor: theme.palette.secondary.light,
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
                    // backgroundColor: theme.palette.secondary.light,
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
    </Box>
  )
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer anchor={"left"} open={isOpenDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

export default Drawer
