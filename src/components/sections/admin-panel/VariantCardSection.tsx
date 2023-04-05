// ** MUI imports
import { Card, CardContent, Typography, CardHeader, Chip, Grid, CardActions, Button, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"

// ** Types
import { VariantsType } from "@/types/context"
interface PropsType {
  variantData: VariantsType
  reset: (data: VariantsType) => void
}

const VariantCardSection = (props: PropsType) => {
  const { variantData, reset } = props

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const renderChips = () => {
    return variantData.variantValues.map((chip, index) => {
      return (
        <Grid item key={index}>
          <Chip
            variant="outlined"
            sx={{ background: theme.palette.secondary.light }}
            color="primary"
            label={
              <Typography fontWeight="500" variant="body1">
                {chip.value}
              </Typography>
            }
            size="medium"
          />
        </Grid>
      )
    })
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={700}>
            {variantData.variantName}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          {renderChips()}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button variant="contained" size="small" onClick={() => reset(variantData)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  )
}

export default VariantCardSection
