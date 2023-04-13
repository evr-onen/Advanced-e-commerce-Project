// ** Core
import React, { forwardRef } from "react"

// ** MUI imports
import { Autocomplete, Card, CardContent, FormHelperText, Grid, TextField, useTheme } from "@mui/material"

// ** Context API
import { useGlobalContext } from "@/contexts"

// ** Third Party
import { Controller, useFormContext } from "react-hook-form"

// ** Types
import { CatsType } from "@/types/context"
import { QuickAdd } from "@/components/global/quickAdd"

const TopSection = forwardRef((_, ref) => {
  // ** Context API
  const { sectionCategory, setSectionCategory, mainCategory, setMainCategory, subCategory, setSubCategory } = useGlobalContext()

  // ** Calls
  const theme = useTheme()

  // ** Hooks
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext()

  // add category from quick add modal
  const addCategory = (type: string, data: string) => {
    let id: number = Date.now()
    let label: string = data!
    let newvalue: { id: number; label: string } = { id, label }

    // ** if there is same name dont create it
    switch (type) {
      case "section_cat":
        if (sectionCategory.every((cat: CatsType) => cat.label !== label)) {
          setSectionCategory([...sectionCategory, { id, label }])
          !!newvalue && setValue("section_cat", newvalue as any) // ** i will look after finish this project
        }
        break
      case "main_cat":
        if (mainCategory.every((cat) => cat.label !== label)) {
          setMainCategory([...mainCategory, { id, label }])
          !!newvalue && setValue("main_cat", newvalue as any) // **  i will look after finish this project
        }
        break
      case "sub_cat":
        if (subCategory.every((cat) => cat.label !== label)) {
          setSubCategory([...subCategory, { id, label }])
          !!newvalue && setValue("sub_cat", newvalue as any) // **  i will look after finish this project
        }
        break
      default:
        break
    }
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} sm={3}>
              <QuickAdd getCategory={addCategory} name="section_cat">
                <Controller
                  control={control}
                  name="section_cat"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      onChange={(_, item) => onChange(item)}
                      value={value || null}
                      options={sectionCategory}
                      getOptionLabel={(item) => (item.label ? item.label : "")}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          InputLabelProps={{
                            sx: { color: theme.palette.text.primary },
                          }}
                          inputRef={ref}
                          label="Section Cat"
                          error={!!errors.section_cat}
                        />
                      )}
                    />
                  )}
                />
              </QuickAdd>
              {errors.section_cat && <FormHelperText error>{errors.section_cat?.message?.toString()}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={3}>
              <QuickAdd getCategory={addCategory} name="main_cat">
                <Controller
                  control={control}
                  name="main_cat"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      onChange={(_, item) => onChange(item)}
                      value={value || null}
                      options={mainCategory}
                      getOptionLabel={(item) => (item.label ? item.label : "")}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          InputLabelProps={{
                            sx: { color: theme.palette.text.primary },
                          }}
                          inputRef={ref}
                          label="Main Cat"
                          error={!!errors.main_cat}
                        />
                      )}
                    />
                  )}
                />
              </QuickAdd>
              {errors.main_cat && <FormHelperText error>{errors.main_cat?.message?.toString()}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={3}>
              <QuickAdd getCategory={addCategory} name="sub_cat">
                <Controller
                  control={control}
                  name="sub_cat"
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      onChange={(_, item) => onChange(item)}
                      value={value || null}
                      autoSelect
                      options={subCategory}
                      getOptionLabel={(item) => (item.label ? item.label : "")}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            sx: { color: theme.palette.text.primary },
                          }}
                          variant="standard"
                          inputRef={ref}
                          label="Sub Cat"
                          error={!!errors.sub_cat}
                        />
                      )}
                    />
                  )}
                />
              </QuickAdd>
              {errors.sub_cat && <FormHelperText error>{errors.sub_cat?.message?.toString()}</FormHelperText>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
})
TopSection.displayName = "TopSection"

export default TopSection
