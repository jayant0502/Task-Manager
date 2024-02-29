import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


function LoginPage() {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const {
    register,

    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (loginData) => {
    try {
      // setLoginSuccess(false);

      const response = await axios.post(
        "http://localhost:8000/users/login",
        loginData
      );
      const { token } = response.data;

      localStorage.setItem("token", token); // Store the token in local storage

      const parsedToken=JSON.parse(atob(token.split('.')[1]))
      const userId = parsedToken._id;

      sessionStorage.setItem("userId", userId);

      setLoginSuccess(true);

      const id = setTimeout(() => {
        navigate("/home");
        reset();
      }, 1000);
      setTimeoutId(id);
    } catch (err) {
      console.error("API call failed:", err);
      if (err.response && err.response.status === 400) {
        const { message } = err.response.data;
        setError("notfound", {
          type: "manual",
          message: message,
        });
      } else {
        console.log(err);
      }

      const id = setTimeout(() => {
        clearErrors();
      }, 3000);

      setTimeoutId(id)
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        background:
          "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "30%",
          minWidth: "200px",
          padding: "1.5rem ",
        }}
      >
        <Typography variant="h4" sx={{ width: "100%", textAlign: "start" }}>
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <TextField
            label="Email"
            size="small"
            variant="outlined"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              trim: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            sx={{ margin: "1rem  0 0.5rem 0", width: "100%" }}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
            // onBlur={() => trigger("email")}
          />

          <TextField
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            placeholder="Enter your password"
            {...register("password", { required: true, trim: true })}
            error={errors.password ? true : false}
            helperText={errors.password && "Password is required"}
            sx={{ margin: "0.5rem 0 1rem 0", width: "100%" }}
          />

          <Button
            variant="contained"
            disabled={errors.notfound ? true : false}
            type="submit"
            value="submit"
            sx={{
              width: "100%",
              margin: "10px 0 10px 0",
              background:
                "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
            }}
          >
            Submit
          </Button>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "black",
              margin: "10px 0 10px 0",
              width: "100%",
              textAlign: "start",
            }}
          >
            Don't have a account?, Register now
          </Link>
        </Box>
        <Stack sx={{ width: "100%", marginTop: "1rem" }}>
          {loginSuccess && <Alert severity="success">Login successful</Alert>}
          {errors.notfound && (
            <Alert severity="error">{errors.notfound?.message}</Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;
