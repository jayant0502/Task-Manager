import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskProvider";
import { Box, Card, Paper, Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Grid from "@mui/material/Grid";
import TaskCard from "../../components/Card/TaskCard";
import AddTaskModal from "../../components/TaskModal/addTaskModal";

const HomePage = () => {
  const { allTask } = useContext(TaskContext);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "space-around",
        background:
          "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
      }}
    >
      <SideBar />

      <Box
        component="div"
        sx={{
          flexGrow: "1",
          p: 3,
          display: "flex",
          justifyContent: "center  ",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          component="div"
          sx={{
            width: "95%",
            height: "90vh",
            overflowY: "scroll",
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.5rem",
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                padding: "0 1.5rem 1.5rem 1.5rem",
              }}
            >
              <Typography variant="h4">All Tasks</Typography>
              <AddTaskModal />
            </Box>
            <Grid container spacing={3}>
              {allTask?.map((task) => (
                <Grid item key={task?._id} xs={12} sm={6} md={4} lg={3}>
                  <TaskCard
                    id={task?._id}
                    title={task?.title}
                    description={task?.description}
                    status={task?.status}
                    date={task?.date}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "250px",
                  }}
                >
                  <AddTaskModal />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;
