// ** Core
import React, { forwardRef } from "react"

// ** MUI imports
import { Autocomplete, Card, CardContent, FormHelperText, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Context API
import { useGlobalContext } from "@/contexts"

// ** Third Party
import { Controller, useWatch, useFormContext } from "react-hook-form"

// ** Types
import { PropertyType } from "@/types/context"

interface PropsType {}

const AddProperties = forwardRef((props: PropsType, ref) => {
  const { properties, setProperties } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** Hooks
  const {
    register,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext()

  const selectedPropertiesObj: PropertyType | null = useWatch({
    control,
    name: "selected_properties",
  })

  const renderSelectedPropertiesItems = () => {
    if (getValues().selected_properties as PropertyType) {
      return selectedPropertiesObj!.values.map((property, ind) => {
        return (
          <Grid item xs={12} key={ind}>
            <Grid container>
              <Grid item className="propertyItem" xs={12}>
                <Typography fontWeight="700" variant="h6" textTransform="capitalize">
                  {property.value}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  {property.values.map((valueItem, index) => {
                    return (
                      <Grid item key={`value${index}`} className="valueItem" xs={12} marginLeft={isSmall ? 0 : "2rem"}>
                        <Grid container alignItems={isSmall ? "end" : "center"}>
                          <Grid item width="30%">
                            <Typography variant="body1" marginRight="1rem" textTransform="capitalize" textAlign="center" display="flex">
                              {valueItem.value}:
                            </Typography>
                          </Grid>
                          <Grid item width="60%">
                            <Controller
                              control={control}
                              shouldUnregister
                              name={`productProperties.${ind}.${index}`}
                              render={({ field: { value, onChange, ref }, fieldState }) => (
                                <TextField
                                  autoComplete="off"
                                  size="small"
                                  variant="standard"
                                  value={value || ""}
                                  onChange={onChange}
                                  ref={ref}
                                  label={valueItem.value}
                                  fullWidth
                                  error={!!fieldState.error}
                                />
                              )}
                            />

                            {errors.productProperties?.[ind as never]?.[index]! && (
                              <FormHelperText error>{(errors?.productProperties as any)![ind]![index].message!}</FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      })
    }
  }

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={4} xl={3}>
        <Card>
          <CardContent>
            <Controller
              name="selected_properties"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, ref } }) => (
                <Autocomplete
                  id="selected_properties"
                  size="small"
                  onChange={(_, item) => {
                    reset({ ...getValues(), selected_properties: item, productProperties: [] })
                    return onChange(item)
                  }}
                  value={value || null}
                  options={properties}
                  getOptionLabel={(option) => option?.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Properties"
                      ref={ref}
                      error={!!errors.selected_properties}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              )}
            />
            {errors?.selected_properties && (
              <FormHelperText sx={{ color: "error.main" }}>{errors?.selected_properties?.message?.toString()}</FormHelperText>
            )}
          </CardContent>
        </Card>
      </Grid>
      {selectedPropertiesObj && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container rowSpacing={4}>
                {renderSelectedPropertiesItems()}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
})

export default AddProperties
