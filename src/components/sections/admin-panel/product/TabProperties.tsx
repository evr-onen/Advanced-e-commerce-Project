// ** Mui Imports
import { Grid, Typography } from "@mui/material"

// ** Types
import { ProductType } from "@/types/createProduct"
interface PropsType {
  productData: ProductType
}

const TabProperties = (props: PropsType) => {
  const { productData } = props

  const renderTable = () => {
    return productData.selected_properties?.values.map((section, sectionIndex) => {
      return (
        <Grid item xs={12} md={4} key={sectionIndex}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" textTransform="capitalize" fontWeight={700}>
                {section.value}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {section.values.map((property, index) => {
                  return (
                    <Grid item ml={5} xs={12} key={index}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body1" textTransform="capitalize" fontWeight={700}>
                            {property.value} :
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" textTransform="capitalize" fontWeight={500}>
                            {productData?.productProperties![sectionIndex][index]!}
                          </Typography>
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

  return <Grid container>{renderTable()}</Grid>
}

export default TabProperties
