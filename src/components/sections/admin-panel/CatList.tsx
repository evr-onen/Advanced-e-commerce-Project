// ** Core
import React, { useState } from "react"

// ** MUI Imports
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid"
import { Box, Button, Card, CardContent, Grid, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"

// ** icons
import { MdEdit, MdDelete } from "react-icons/md"

// ** Components
import CatListModal from "src/components/sections/admin-panel/CatListModal"

// ** Types
interface PropsType {
  data: { id: number; label: string }[] | []
  setFunction: (catData: { id: number; label: string }, listType: string, action: string) => void
  dataName: string
  canItDelete: (id: number, catType: string) => boolean
}

const CatList = (props: PropsType) => {
  const { data, setFunction, dataName, canItDelete } = props

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [modalValue, setModalValue] = useState<{ id: number; label: string }>({ id: Date.now(), label: "" })

  // ** Handler Funcs
  const ShowModalHandler = (id?: number) => {
    setShow((prev) => !prev)

    if (id) {
      let tmtString = data.find((item) => item.id === Number(id))!

      setModalValue({ id: id, label: tmtString.label })
    } else {
      setModalValue({ id: Date.now(), label: "" })
    }
  }

  // ** listColumns
  const columns: GridColDef[] = [
    {
      field: "label",
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography variant="body1" textTransform="capitalize" fontWeight="700" textAlign="center">{`${dataName} List`}</Typography>
      ),
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" textTransform="capitalize" fontWeight="500" textAlign="center">
          {params.value}
        </Typography>
      ),
    },

    {
      field: "actions",
      flex: 1,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Typography variant="body1" textTransform="capitalize" fontWeight="700" textAlign="center">
          actions
        </Typography>
      ),
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Tooltip title="edit">
            <IconButton onClick={() => ShowModalHandler(params.row.id)}>
              <MdEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <Box>
              <IconButton
                onClick={() => setFunction({ id: params.row.id, label: params.row.label }, dataName.toLowerCase(), "delete")}
                disabled={!canItDelete(params.row.id, dataName.toLowerCase())}
              >
                <MdDelete />
              </IconButton>
            </Box>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Grid container rowSpacing={4} justifyContent="center">
      <Grid item xs={12} md={7} lg={12}>
        <Card>
          <CardContent>
            <Box sx={{ height: 400, width: "auto" }}>
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                hideFooterSelectedRowCount
                isRowSelectable={() => false}
                sx={{
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  borderColor: theme.palette.divider,

                  "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                  },
                }}
                onSelectionModelChange={(newSelection) => {
                  console.log(newSelection[0])
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <CatListModal
        show={show}
        ShowModalHandler={ShowModalHandler}
        modalValue={modalValue!}
        setFunction={setFunction}
        listType={dataName.toLowerCase()}
      />
      <Grid item xs={12} md={6} lg={12}>
        <Button fullWidth variant="contained" onClick={() => ShowModalHandler()}>
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default CatList
