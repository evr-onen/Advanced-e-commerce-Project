// ** Core
import { GetServerSideProps } from "next"

// MUI Imports
import { Card, CardContent, Fab, FormHelperText, Grid, TextField, Typography } from "@mui/material"

// ** Third Party
import { Controller, useFieldArray, FieldErrors } from "react-hook-form"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import NoSSR from "react-no-ssr"
import { resetServerContext } from "react-beautiful-dnd"

// ** Icons
import { FaMinus, FaPlus } from "react-icons/fa"
import { BsArrowsMove } from "react-icons/bs"

// ** Types
interface PropsType {
  fieldIndex: number
  control: any
  errors: FieldErrors<{
    properties: {
      id: number
      name: string
      values: {
        value: string
        values: { value: string }[]
      }[]
    }
  }>
}
const PropertiesDnD = (props: PropsType) => {
  const { fieldIndex, control, errors } = props

  // ** Hooks
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: `properties.values.${fieldIndex}.values`,
  })

  // ** DragNDrop handler
  function handleOnDragEnd(result: any) {
    console.log(result)
    if (!result.destination) return

    move(result.source.index, result.destination.index)
  }

  // ** Add Title Field
  const addField = () => {
    append({ value: "" })
  }

  return (
    <NoSSR>
      <Grid container className="createPropertyPage_PropertiesDnD" rowSpacing={4} justifyContent="center">
        <Grid item xs={12}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="TitleArea">
              {(provided) => (
                <Grid
                  container
                  rowSpacing={4}
                  className="TitleArea valueCard"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  justifyContent="center"
                  alignItems="center"
                >
                  {fields.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={`DragNDrop.${item.id}`} index={index}>
                        {(provided) => (
                          <Grid
                            item
                            xs={12}
                            sx={{ "&:hover .fabPlus": { opacity: "1", visibility: "visible" } }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Grid container justifyContent="center" alignItems="center" spacing={1}>
                              <Grid item xs={9} md={9}>
                                <Card sx={{ borderRadius: "15px" }}>
                                  <CardContent>
                                    <BsArrowsMove size="30px" />
                                    <Grid container columnSpacing={4}>
                                      <Grid item xs={8} md={10}>
                                        <Controller
                                          name={`properties.values.${fieldIndex}.values.${index}.value`}
                                          control={control}
                                          render={({ field: { onChange, value, ref }, fieldState }) => (
                                            <TextField
                                              variant="standard"
                                              autoComplete="off"
                                              value={value || ""}
                                              onChange={onChange}
                                              inputRef={ref}
                                              label={`Value ${index + 1}`}
                                              fullWidth
                                              error={!!fieldState.error}
                                            />
                                          )}
                                        />
                                        {errors.properties?.values?.[fieldIndex]?.values?.[index]?.value! && (
                                          <FormHelperText error>
                                            {errors.properties?.values[fieldIndex]?.values?.[index]?.value!.message}
                                          </FormHelperText>
                                        )}
                                      </Grid>
                                      <Grid item xs={3} md={2}>
                                        <Fab color="primary" aria-label="plus" onClick={() => remove(index)} size="small">
                                          <FaMinus size="1rem" />
                                        </Fab>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                md={1}
                                textAlign="center"
                                className="fabPlus"
                                sx={{ opacity: "0", visibility: "hidden", transition: "300ms" }}
                              >
                                <Fab color="primary" aria-label="plus" onClick={addField} size="small">
                                  <FaPlus size="1rem" />
                                </Fab>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </NoSSR>
  )
}

export default PropertiesDnD

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext()
  return { props: {} }
}
