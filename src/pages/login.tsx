// ** React/Next Core
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
// ** Context
import { useGlobalContext } from "src/contexts"

// ** MUI imports
import { Button, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material"
// import { useTheme } from "@mui/material"

// ** Third Party Imports
import * as yup from "yup"
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// NOTE - YUP Schema
const schema = yup.object().shape({
  email: yup.string().required("Username Required"),
  password: yup.string().required("Password Required"),
})

// ** DummyLoginData
import { dummyUsersData } from "@/dummyData/users"
import { useEffect } from "react"

// ** Types
type LoginDataType = {
  email: string
  password: string
}

const LoginRegister = () => {
  // const theme = useTheme()
  const { setUser } = useGlobalContext()

  // ** Hooks
  const router = useRouter()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "admin@deneme.com", password: "1234" },
    mode: "onChange",
  })

  const submitHandler = (data: LoginDataType) => {
    console.log(data)
    if (dummyUsersData.findIndex((item: any) => item.email === data.email.trim()) !== -1) {
      if (dummyUsersData.find((user) => user.email === data.email)!.password === data.password) {
        setUser({ ...dummyUsersData.find((user) => user.email === data.email)! })
        localStorage.setItem("user", JSON.stringify(dummyUsersData.find((user) => user.email === data.email)))
        router.push("/")
      }
    }
  }

  return (
    <Grid container className="home" width="1370px" height="100vh" justifyContent="center" mx="auto">
      <Grid item xs={12} px="2rem" m="auto">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight="bold" color="initial">
              Login / Registration
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h5" fontWeight="bold" textTransform="capitalize">
                    Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="email"
                      shouldUnregister={false}
                      render={({ field: { value, onChange, ref }, fieldState }) => (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          // InputLabelProps={{
                          //   sx: { color: theme.palette.text.primary },
                          // }}
                          value={value || null}
                          onChange={onChange}
                          inputRef={ref}
                          label="E-mail"
                          fullWidth
                          error={!!fieldState.error}
                        />
                      )}
                    />

                    {errors.email && <FormHelperText error>{errors.email?.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name="password"
                      shouldUnregister={false}
                      render={({ field, fieldState }) => (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          type="password"
                          // InputLabelProps={{
                          //   sx: { color: theme.palette.text.primary },
                          // }}
                          value={field.value || null}
                          onChange={field.onChange}
                          inputRef={field.ref}
                          label="Password"
                          fullWidth
                          error={!!fieldState.error}
                        />
                      )}
                    />

                    {errors.password && <FormHelperText error>{errors.password?.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default LoginRegister
