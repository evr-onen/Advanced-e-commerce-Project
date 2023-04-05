import { Dialog, DialogActions, DialogTitle, TextField, Button, DialogContent, Grid, FormHelperText, IconButton } from "@mui/material"
import { Children, useState, ReactNode, JSXElementConstructor, ReactElement, ReactPortal, forwardRef } from "react"
import { useTheme } from "@mui/material"
// ** Icons
import { FaPlus, FaMinus } from "react-icons/fa"

// ** Third Party Imports
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Types
type PropsType = {
  children: ReactNode[] | ReactNode
  getCategory: (type: string, data: string) => void
  name: string
}

// NOTE - YUP Schema
const schemaModal = yup.object().shape({
  modalValue: yup.string().required("Need to Fill This Input"),
})

// ** Types
const defaultValues = {
  modalValue: "",
}

export const QuickAdd = forwardRef((props: PropsType, inputRef) => {
  const { children, getCategory, name } = props

  // ** States
  const [open, setOpen] = useState(false)

  // ** Hooks
  const theme = useTheme()

  const {
    reset,
    control: modalControl,
    handleSubmit: modalSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModal),
    defaultValues,
    mode: "onChange",
  })

  const modalToggle = () => {
    setOpen((prev) => !prev)
  }
  const modalSubmitHandler = () => {
    if (!errors.modalValue) {
      getCategory(name, getValues().modalValue)
      reset()
      modalToggle()
    }
  }

  const arrayChildren = Children.toArray(children)
  return (
    <Grid container>
      {arrayChildren?.map((child, index) => {
        return (
          <Grid item xs={12} key={index + Date.now()}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={9}>
                {child}
              </Grid>
              <Grid item xs={3}>
                <IconButton onClick={modalToggle}>
                  <FaPlus />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <Dialog onClose={modalToggle} open={open}>
        <DialogTitle>Create New One Category</DialogTitle>
        <form>
          <DialogContent>
            <Controller
              control={modalControl}
              name="modalValue"
              render={({ field, fieldState }) => (
                <TextField
                  variant="standard"
                  InputLabelProps={{
                    sx: { color: theme.palette.text.primary },
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  label="Category Name"
                  fullWidth
                  autoComplete="off"
                  error={!!fieldState.error}
                />
              )}
            />

            {errors.modalValue && <FormHelperText error>{errors.modalValue?.message}</FormHelperText>}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={modalSubmitHandler}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
})
QuickAdd.displayName = "QuickAdd"
