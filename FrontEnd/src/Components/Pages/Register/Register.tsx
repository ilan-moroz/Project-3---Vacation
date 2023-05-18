import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../Layout/Logo/Logo";
import { useNavigate, NavLink } from "react-router-dom";
import "./Register.css";
import { User } from "../../../Model/User";
import axios from "axios";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Email, Group, Password, Person } from "@mui/icons-material";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { vacation } from "../../../Redux/VacationStore";
import { adminLoginAction, userLoginAction } from "../../../Redux/UserReducer";

// saves new user in the database and redux
const addNewUser = (newUser: User) => {
  axios
    .post("http://localhost:8080/api/v1/vacation/users/newUser", newUser)
    .then((response) => {
      console.log(response);
    });
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Shnitzel Vacations {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// theme for the register form
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});
export default function Register() {
  // use navigate for page navigate
  const navigate = useNavigate();
  // use form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // new notyf for checking if email exists in database
  const notyf = new Notyf({
    position: {
      x: "center",
      y: "top",
    },
  });
  const onSubmit = async (data: any) => {
    // checking if email exists in database
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vacation/users/checkEmail",
        { email: data.email }
      );
      if (response.data) {
        notyf.error("This email is already registered, please try again");
        // if email don't exists add new user to database
      } else {
        const isAdmin =
          data.email === "admin@admin.admin" && data.password === "Admin";
        const newUser: User = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          admin: isAdmin ? 1 : 0,
        };
        if (isAdmin) {
          vacation.dispatch(adminLoginAction());
          addNewUser(newUser);
          navigate("/vacations");
        } else {
          vacation.dispatch(userLoginAction());
          addNewUser(newUser);
          navigate("/vacations");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className="Register"
        component="main"
        sx={{ height: "96vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/1920x1080/?landscape,travel)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ height: "100%" }}
        >
          <Header />
          <Box
            sx={{
              height: "100%",
              my: -10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register("firstName", { required: true })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName && "First name is required"}
                placeholder="First Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                {...register("lastName", { required: true })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName && "Last name is required"}
                placeholder="Last Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Group />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                error={Boolean(errors.email)}
                helperText={
                  errors.email &&
                  "Email is required and must be a valid email address"
                }
                placeholder="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="Password"
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 4,
                })}
                error={Boolean(errors.password)}
                helperText={
                  errors.password &&
                  "Password must have a minimum of 4 characters"
                }
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <NavLink to="/login" className="button">
                {"Already have an account? Login now!"}
              </NavLink>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
