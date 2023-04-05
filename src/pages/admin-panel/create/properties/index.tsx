// ** Core
import React, { useState } from "react"

// MUI Imports
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"

// ** Third Party
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import NoSSR from "react-no-ssr"
import { resetServerContext } from "react-beautiful-dnd"

// ** Components
import PropertiesDnD from "@/components/sections/admin-panel/PropertiesDnD"

// ** icons
import { FaPlus, FaSave } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { useGlobalContext } from "@/contexts"

// NOTE - YUP Schema
const schema = yup.object().shape({
  properties: yup.object().shape({
    values: yup.array().of(
      yup.object({
        values: yup.array().of(
          yup.object({
            value: yup.string().required("Property Item can not be EMPTY"),
          })
        ),
        value: yup.string().required("Property Title Required"),
      })
    ),
    name: yup.string().required("name can not be EMPTY"),
  }),
})
// ** Types
import { PropertyType } from "@/types/context"
import { GetServerSideProps } from "next"

const defaultValues = {
  properties: { id: 1, name: "", values: [{ value: "", values: [{ value: "" }] }] },
}

const index = () => {
  const { properties, setProperties } = useGlobalContext()

  // ** States
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>()

  // const selectedRef = React.useRef<HTMLInputElement>(null)
  const selectedRef = React.useRef<React.MutableRefObject<null>>(null)

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "properties.values",
  })

  // ** Handler Funcs
  function handleOnDragEnd(result: any) {
    if (!result.destination) return

    move(result.source.index, result.destination.index)
  }

  // ** Add Title Field
  const addField = () => {
    append({ value: "", values: [{ value: "" }] })
  }
  // ** All Submit Handler
  const submitHandler = (data: any) => {
    console.log(data)
    setProperties([...properties, { ...data, id: Date.now() }])
  }
  const editBtnHandler = () => {
    reset({ properties: selectedProperty! })
  }

  const deleteHandler = () => {
    if (selectedProperty) {
      // let tmpArr=[...properties]
      let tmpArr = properties.filter((propertiesObj) => propertiesObj.id !== selectedProperty!.id)

      setProperties(tmpArr!)
      setSelectedProperty(null)
      reset(defaultValues)
      // if (selectedRef.current != undefined) {
      //   selectedRef.current.value! = ""
      // }
    }
  }
  return (
    <Grid container className="insideWrapper" justifyContent="center" rowSpacing={4}>
      <Grid item xs={12} px="4rem">
        <Typography variant="h4" color="initial" textTransform="capitalize" fontWeight="700">
          create properties
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center" spacing={4}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={properties}
                  getOptionLabel={(option) => option.name}
                  clearOnEscape
                  value={selectedProperty || null}
                  onChange={(event, newValue) => {
                    if (properties.findIndex((item) => item.id == newValue?.id) !== -1) {
                      setSelectedProperty(newValue!)
                    } else {
                      setSelectedProperty(null)
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} size="small" inputRef={selectedRef} variant="standard" label="Selected Property" />}
                />
              </Grid>
              <Grid item xs={4} md={2} xl={1}>
                <Button variant="contained" onClick={editBtnHandler}>
                  Edit
                </Button>
              </Grid>
              <Grid item xs={4} md={2} xl={1}>
                <Button variant="contained" onClick={deleteHandler}>
                  delete
                </Button>
              </Grid>
              <Grid item xs={4} md={2} xl={1}>
                <Button
                  variant="contained"
                  onClick={() => {
                    reset(defaultValues)
                  }}
                >
                  New
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8} md={3}>
        <Card>
          <CardContent>
            <Stack textAlign="center">
              <Box>
                <Controller
                  control={control}
                  name="properties.name"
                  render={({ field: { value, onChange, ref }, fieldState }) => (
                    <TextField
                      size="small"
                      autoComplete="off"
                      variant="standard"
                      value={value || ""}
                      onChange={onChange}
                      inputRef={ref}
                      label="Properties Type Name"
                      error={!!fieldState.error}
                    />
                  )}
                />
                {errors?.properties?.name && <FormHelperText error>{errors.properties.name?.message}</FormHelperText>}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <NoSSR>
          <form onSubmit={handleSubmit(submitHandler as () => string)}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="TitleArea">
                    {(provided) => (
                      <Grid container spacing={4} className="TitleArea" justifyContent="center" ref={provided.innerRef} {...provided.droppableProps}>
                        {fields.map((item, index) => {
                          return (
                            <Grid item xs={12} key={item.id}>
                              <Draggable key={item.id} draggableId={`DragNDrop.${item.id}`} index={index}>
                                {(provided) => (
                                  <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <CardContent>
                                      <Grid container spacing={4}>
                                        <Grid item xs={8}>
                                          <Controller
                                            name={`properties.values.${index}.value`}
                                            control={control}
                                            render={({ field: { onChange, value, ref }, fieldState }) => (
                                              <TextField
                                                variant="standard"
                                                size="small"
                                                autoComplete="off"
                                                value={value || ""}
                                                onChange={onChange}
                                                inputRef={ref}
                                                label={`Title ${index + 1}`}
                                                fullWidth
                                                error={!!fieldState.error}
                                              />
                                            )}
                                          />
                                          {errors.properties?.values?.[index]?.value! && (
                                            <FormHelperText error>{errors.properties?.values?.[index]?.value!.message}</FormHelperText>
                                          )}
                                        </Grid>
                                        <Grid item xs={1}>
                                          <Fab color="primary" aria-label="delete" onClick={() => remove(index)} size="small">
                                            <ImCross size="1rem" />
                                          </Fab>
                                        </Grid>
                                        <Grid item xs={12} ml="2rem">
                                          <PropertiesDnD control={control} fieldIndex={index} errors={errors} />
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            </Grid>
                          )
                        })}
                        {provided.placeholder}
                      </Grid>
                    )}
                  </Droppable>
                </DragDropContext>
              </Grid>
              <Grid item xs={12} textAlign="end" position="fixed" right={isSmall ? "1rem" : "5rem"} bottom={isSmall ? "1rem" : "5rem"}>
                <Stack spacing={2}>
                  <Fab color="primary" aria-label="plus" onClick={addField} size="medium">
                    <FaPlus size="1.5rem" />
                  </Fab>
                  <Fab color="primary" aria-label="save" type="submit" size="medium">
                    <FaSave size="1.5rem" />
                  </Fab>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </NoSSR>
      </Grid>
    </Grid>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext()
  return { props: {} }
}
