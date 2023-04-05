// ** MUI Imports
import { Box, Grid, Typography, useTheme } from "@mui/material"

// ** Icons
import { SlEarphonesAlt } from "react-icons/sl"
import { BsCreditCard2Back } from "react-icons/bs"
import { SlActionUndo } from "react-icons/sl"

const OurAdvantage = () => {
  const theme = useTheme()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sm={4} minHeight="300px" p="1.25rem">
            <Grid container justifyContent="center">
              <Grid item xs={12} justifyContent="center" alignItems="center" display="flex" mb="1.25rem" color="black">
                <Box
                  border="2px solid"
                  color={theme.palette.secondary?.main}
                  borderRadius="500px"
                  display="flex"
                  width="85px"
                  height="85px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <SlEarphonesAlt fontSize="2.1875rem" />
                </Box>
              </Grid>
              <Grid item mb="1.25rem">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography textAlign="center" textTransform="uppercase" color="black" fontWeight="700">
                      customer support
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textTransform="capitalize" textAlign="center">
                      Need Assistence?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} minHeight="300px" p="1.25rem">
            <Grid container justifyContent="center">
              <Grid item xs={12} justifyContent="center" alignItems="center" display="flex" mb="1.25rem" color="black">
                <Box
                  border="2px solid"
                  color={theme.palette.secondary?.main}
                  borderRadius="500px"
                  display="flex"
                  width="85px"
                  height="85px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BsCreditCard2Back fontSize="2rem" />
                </Box>
              </Grid>
              <Grid item mb="1.25rem">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography textAlign="center" textTransform="uppercase" color="black" fontWeight="700">
                      SECURED PAYMENT
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textTransform="capitalize" textAlign="center">
                      Safe & Fast
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} minHeight="300px" p="1.25rem">
            <Grid container justifyContent="center">
              <Grid item xs={12} justifyContent="center" alignItems="center" display="flex" mb="1.25rem" color="black">
                <Box
                  border="2px solid"
                  color={theme.palette.secondary?.main}
                  borderRadius="500px"
                  display="flex"
                  width="85px"
                  height="85px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <SlActionUndo fontSize="2rem" />
                </Box>
              </Grid>
              <Grid item mb="1.25rem">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography textAlign="center" textTransform="uppercase" color="black" fontWeight="700">
                      RETURNS
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textTransform="capitalize" textAlign="center">
                      Easy & Free
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OurAdvantage
