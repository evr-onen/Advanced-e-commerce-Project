// ** Core
import React, { useState } from "react"
import { GetServerSideProps } from "next"

// ** MUI imports
import { Button, Card, CardContent, Grid, TextField } from "@mui/material"

// ** hook From Imports
import { Controller, useFieldArray, useForm } from "react-hook-form"

import NoSSR from "react-no-ssr"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// ** Drag N Drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { resetServerContext } from "react-beautiful-dnd"

// NOTE - YUP Schema
const schema = yup.object().shape({
  properties: yup.array().of(
    yup.object({
      value: yup.string().required("itemvalues required"),
    })
  ),
})

const PropertiesDnD = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { properties: [{ value: "" }] },
    mode: "onChange",
  })

  function handleOnDragEnd(result: any) {
    console.log(result)
    if (!result.destination) return

    move(result.source.index, result.destination.index)
  }

  const { fields, append, move } = useFieldArray({
    control,
    name: `properties` as never,
  })

  const addNestedField = () => {
    append({ id: Math.floor(Math.random() * 10000), value: "" })
  }

  return (
    <Grid container>
      <Grid item>
        <Button variant="contained" onClick={addNestedField}>
          Add value
        </Button>
      </Grid>
      {/* <Grid item>
        <Button variant="contained" onClick={() => move(0, 3)}>
          asdasda
        </Button>
      </Grid> */}

      <Grid item>
        <NoSSR>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="ValueArea">
              {(provided) => (
                <Grid container spacing={4} className="ValueArea" ref={provided.innerRef} {...provided.droppableProps} flexDirection="row">
                  {fields.map((item, index) => {
                    return (
                      <Draggable key={item.id} draggableId={"nested" + item.id} index={index}>
                        {(provided) => (
                          <Grid item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card>
                              <CardContent>
                                <Controller
                                  name={`properties.${index}.value`}
                                  control={control}
                                  render={({ field: { onChange, value, ref }, fieldState }) => (
                                    <TextField
                                      variant="standard"
                                      autoComplete="off"
                                      value={value || ""}
                                      onChange={onChange}
                                      inputRef={ref}
                                      label={`Value ${index}`}
                                      fullWidth
                                      error={!!fieldState.error}
                                    />
                                  )}
                                />
                                {/* {errors.properties?.[fieldIndex]?.values?.[index]?.value! && (
                                  <FormHelperText error>{errors.properties?.[fieldIndex]?.values?.[index]?.value!.message}</FormHelperText>
                                )} */}
                              </CardContent>
                            </Card>
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
        </NoSSR>
      </Grid>
    </Grid>
  )
}

export default PropertiesDnD

export const getServerSideProps: GetServerSideProps = async (context) => {
  resetServerContext()
  return { props: {} }
}
