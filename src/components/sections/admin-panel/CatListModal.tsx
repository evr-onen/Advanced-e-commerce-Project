// ** Core
import React, { forwardRef, ReactElement, Ref, useEffect, useRef } from "react"

// ** MUI Imports
import { Grid, DialogTitle, Dialog, Button, TextField, DialogContent, DialogActions, FormHelperText, Fade, FadeProps } from "@mui/material"

// ** Types
interface PropsType {
  show: boolean
  ShowModalHandler: (id?: number) => void
  modalValue: { id: number; label: string }
  setFunction: (catData: { id: number; label: string }, listType: string, action: string) => void
  listType: string
}
// ** Third Party Imports
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-hot-toast"
import { useGlobalContext } from "@/contexts"

// ** Vars
const Transition = forwardRef(function Transition(props: FadeProps & { children?: ReactElement<any, any> }, ref: Ref<unknown>) {
  return <Fade ref={ref} {...props} />
})

const CatListModal = (props: PropsType) => {
  const { ShowModalHandler, show, modalValue, setFunction, listType } = props

  const { sectionCategory, mainCategory, subCategory } = useGlobalContext()
  // NOTE - YUP Schema
  const schema = yup.object().shape({
    label: yup.string().required("Label required"),
  })

  // ** Hooks
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { id: Date.now(), label: "" },
    mode: "onChange",
  })

  // ** Handler Funcs

  const onSubmit = (data: any) => {
    console.log(data)
    ShowModalHandler()

    switch (listType.toLowerCase()) {
      case "section":
        if (sectionCategory.every((item) => item.id !== data.id)) {
          setFunction({ id: Date.now(), label: data.label }, listType, "create")
        } else {
          setFunction({ id: data.id, label: data.label }, listType, "edit")
        }
        break
      case "main":
        if (mainCategory.every((item) => item.id !== data.id)) {
          setFunction({ id: Date.now(), label: data.label }, listType, "create")
        } else {
          setFunction({ id: data.id, label: data.label }, listType, "edit")
        }
        break
      case "sub":
        if (subCategory.every((item) => item.id !== data.id)) {
          setFunction({ id: Date.now(), label: data.label }, listType, "create")
        } else {
          setFunction({ id: data.id, label: data.label }, listType, "edit")
        }
        break

      default:
        break
    }
    reset()
  }

  useEffect(() => {
    reset({ id: modalValue.id, label: modalValue.label as string })
  }, [modalValue])

  return (
    <Dialog fullWidth open={show} maxWidth="sm" scroll="body" onClose={() => ShowModalHandler()} TransitionComponent={Transition}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogTitle fontWeight={700} textTransform="capitalize">{`Add ${listType}`}</DialogTitle>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="label"
                render={({ field, fieldState }) => (
                  <TextField {...field} autoComplete="off" label="Label" fullWidth error={!!fieldState.error} inputRef={field.ref} />
                )}
              />

              {errors.label && (
                <FormHelperText error data-cy="email-error-text">
                  {errors.label?.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ /* pb: { xs: 8, sm: 12.5 }, */ justifyContent: "end" }}>
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
          <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={() => ShowModalHandler()}>
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CatListModal
