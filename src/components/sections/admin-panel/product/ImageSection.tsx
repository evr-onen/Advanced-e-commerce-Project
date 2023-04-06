// ** Core
import React, { forwardRef, useEffect } from "react"
import Image from "next/image"

// ** MUI imports
import { Box, Button, Card, CardContent, Fab, FormHelperText, Grid, useMediaQuery, useTheme } from "@mui/material"

// ** Third Party
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { ImCross } from "react-icons/im"
import NoSSR from "react-no-ssr"
import { BsArrowsMove } from "react-icons/bs"

// ** Types

interface PropsType {
  productImages: FileList
  takeProductImages: (data: FileList) => void
  imageCount: number
}

// ** Vars
let tmpArr: string[] = []

const ImageSection = forwardRef((props: PropsType, ref) => {
  const { productImages, takeProductImages, imageCount } = props

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** Hooks
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "pics",
  })

  const imageFilesWatch = useWatch({
    control,
    name: "imageFiles",
  })

  useEffect(() => {
    console.log(imageFilesWatch)
    setTimeout(() => {
      imageFilesWatch?.map((item: string, index: number) => {
        append({ name: item, id: Date.now() })
      })
    }, 300)
  }, [imageCount])

  function handleOnDragEnd(result: any) {
    if (!result.destination) return

    move(result.source.index, result.destination.index)
    console.log(fields)
  }
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button variant="contained">
                <label htmlFor="sendFileInput">Set Images</label>
              </Button>
              {errors?.imageFiles && <FormHelperText sx={{ color: "error.main" }}>{errors?.imageFiles?.message?.toString()}</FormHelperText>}
              <input
                type="file"
                id="sendFileInput"
                multiple={true}
                name="imageFiles"
                accept="image/*"
                hidden
                onChange={(e) => {
                  let targetValues = { ...e.target.files! }
                  tmpArr = []
                  Object.values(e.target.files!).map((item) => {
                    tmpArr.push(item.name!)
                  })

                  setValue("imageFiles", tmpArr as never)
                  Object.values(targetValues).map((img) => {
                    append({ src: img })
                  })
                  console.log(fields)
                  if (e.target.files !== null) takeProductImages(targetValues)
                }}
              />
            </Grid>
            <Grid container>
              <Grid item xs={12} justifyContent="center">
                <NoSSR>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="TitleArea" direction={isSmall ? "vertical" : "horizontal"}>
                      {(provided) => (
                        <Grid
                          container
                          spacing={4}
                          width="100%"
                          minHeight="400px"
                          className="TitleArea"
                          justifyContent="center"
                          flexDirection={isSmall ? "column" : "row"}
                          flexWrap="nowrap"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {fields.map((item: any, index) => {
                            return (
                              <Grid item xs={12} sm={4} md={3} key={item.id}>
                                <Draggable key={item.id} draggableId={`DragNDrop.${item.id}`} index={index}>
                                  {(provided) => (
                                    <Card
                                      sx={{ position: "relative" }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CardContent>
                                        <Grid item xs={1} display="flex">
                                          <Fab
                                            color="primary"
                                            aria-label="delete"
                                            onClick={() => remove(index)}
                                            size="small"
                                            sx={{ position: "absolute", top: 0, right: 0 }}
                                          >
                                            <ImCross size="1rem" />
                                          </Fab>
                                        </Grid>
                                        <Box maxWidth="200px" width="100%" minHeight="250px" position="relative" m="auto">
                                          {item.hasOwnProperty("src") ? (
                                            <img src={URL?.createObjectURL(item.src)} className="imageStyle" alt="asda1" />
                                          ) : (
                                            <img src={`/images/productImages/${item.name}`} className="imageStyle" alt="asda2" />
                                          )}
                                          <Grid item xs={1} sx={{ position: "absolute", bottom: 0, right: "50%", transform: "translateX(50%)" }}>
                                            <BsArrowsMove size="30px" />
                                          </Grid>
                                        </Box>
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
                </NoSSR>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
})
ImageSection.displayName = "ImageSection"
export default ImageSection
