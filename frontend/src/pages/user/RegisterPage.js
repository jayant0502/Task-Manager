import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (userData) => {
    console.log(userData);
    axios
      .post("http://localhost:8000/users/register", userData)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.data.token);
        setRegistered(true);
        
        const id=  setTimeout(() => {
            navigate("/");
            reset();
          }, 1000)
       setTimeoutId(id)

        const id1=setTimeout(()=>{
          setRegistered(false);
        },3000)
        setTimeoutId(id1)
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError("register", err.response.data);
        } else {
          console.log(err);
        }
        const id =setTimeout(()=>{
          clearErrors()
        },3000)
        setTimeoutId(id)
      });
  };

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
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
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            placeholder="Enter your name"
            {...register("name", { required: true, trim: true })}
            sx={{ margin: "1rem 0 0.5rem 0", width: "100%" }}
            error={errors.name ? true : false}
            helperText={errors.name && "Name is required"}
          />

          <TextField
            label="Email"
            size="small"
            variant="outlined"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            sx={{ margin: "0.5rem 0 0.5rem 0", width: "100%" }}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
          />

          <TextField
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              trim: true,
              minLength: {
                value: 8,
                message: "Password is required (min. 8 characters)",
              },
            })}
            sx={{ margin: "0.5rem 0 1rem 0", width: "100%" }}
            error={errors.password ? true : false}
            helperText={errors.password && errors.password.message}
          />

          <Button
            variant="contained"
            disabled={errors.register ? true : false}
            type="submit"
            sx={{
              width: "100%",
              margin: "10px 0 10px 0",

              background:
                "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
            }}
          >
            Register
          </Button>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              margin: "10px 0 10px 0",
              width: "100%",
              textAlign: "start",
            }}
          >
             Already have an account? Sign in
          </Link>
        </Box>

        <Stack sx={{ width: "100%", marginTop: "1rem" }}>
          {registered && (
            <Alert
              severity="success"
              
            >
              Registration Successful
            </Alert>
          )}
          {errors.register && (
            <Alert
              severity="error"
              
            >
              {errors.register?.message}
            </Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
