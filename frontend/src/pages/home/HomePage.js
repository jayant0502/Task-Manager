import React from "react";

import { Box, Paper } from "@mui/material";

import SideBar from "../../components/SideBar/SideBar";
import Grid from "@mui/material/Grid";
const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background:
          "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
      }}
    >
      <Grid container spacing={3} columns={16} justifyContent="center"
  alignItems="center">
        
          <SideBar />
        <Grid item xs={12} md={14} >
          <Box component="main">
            <Paper
              elevation={3}
              component="div"
              sx={{
                height: "90vh",
              }}
            ></Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
