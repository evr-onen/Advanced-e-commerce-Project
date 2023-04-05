// ** Core
import React, { forwardRef, useEffect } from "react"
import Image from "next/image"

// ** MUI imports
import { Box, Button, Card, CardContent, Fab, FormHelperText, Grid } from "@mui/material"

// ** Third Party
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { ImCross } from "react-icons/im"
import NoSSR from "react-no-ssr"

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
                    <Droppable droppableId="TitleArea" direction="horizontal">
                      {(provided) => (
                        <Grid
                          container
                          spacing={4}
                          width="100%"
                          minHeight="400px"
                          className="TitleArea"
                          justifyContent="center"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {fields.map((item: any, index) => {
                            return (
                              <Grid item width="20%" key={item.id}>
                                <Draggable key={item.id} draggableId={`DragNDrop.${item.id}`} index={index}>
                                  {(provided) => (
                                    <Card
                                      sx={{ position: "relative" }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CardContent>
                                        <Grid item xs={1}>
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
                                        <Box width="200px" height="250px" position="relative">
                                          {item.hasOwnProperty("src") ? (
                                            <Image src={URL?.createObjectURL(item.src)} fill className="imageStyle" alt="asda1" />
                                          ) : (
                                            <Image src={`/images/productImages/${item.name}`} fill className="imageStyle" alt="asda2" />
                                          )}
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

            {/* {fields.map((item: any, index) => {
              console.log(item)
              return (
                <Grid item key={index}>
                  <Box width="200px" height="250px" position="relative">
                    <Image src={URL?.createObjectURL(item.src)} fill className="imageStyle" alt="asda" />
                  </Box>
                </Grid>
              )
            })} */}

            {/* {productImages
              ? Object.values(productImages).map((item, index) => {
                  return (
                    <Grid item key={index}>
                      <Box width="200px" height="250px" position="relative">
                        <Image src={URL?.createObjectURL(item)} fill className="imageStyle" alt="asda" />
                      </Box>
                    </Grid>
                  )
                })
              : null} */}

            {/* {!productImages &&
              getValues().imageFiles.map((item: string, index: number) => (
                <Grid item key={index}>
                  <Box width="200px" height="250px" position="relative">
                    <Image src={`/images/productImages/${item}`} fill className="imageStyle" alt={item} />
                  </Box>
                </Grid>
              ))} */}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
})
ImageSection.displayName = "ImageSection"
export default ImageSection
