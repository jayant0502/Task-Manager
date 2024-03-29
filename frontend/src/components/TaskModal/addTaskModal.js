import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  Box,  
  Button,  
} from "@mui/material";
import { useForm } from "react-hook-form";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TaskModal from "./Modal";

const socket = io("http://localhost:8000");

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);
  const { reset, setValue, clearErrors, setError } = useForm();
  const [timeoutId, setTimeoutId] = useState(null);
  const [customErrors, setCustomErrors] = useState({});
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const ownerId = tokenPayload._id;
      const config = { headers: { Authorization: `bearer ${token}` } };

      const response = await axios.post(
        "http://localhost:8000/tasks/addTask",
        { ...data, ownerId },
        
      );
      setTaskAdded(true);
      socket.emit("taskAdded", response.data);

      const id = setTimeout(() => {
        setTaskAdded(false);
      }, 3000);
      setTimeoutId(id);

      setValue("status", "");
      reset();
    } catch (error) {
      console.error("Error", error);

      if (error.response && (error.response.status === 401||400||404)) {
        setCustomErrors({ type: "manual", message: "Failed adding task" });
      }
      console.log(customErrors?.message);
      // const id = setTimeout(() => {
      //   clearErrors();
      // }, 3000);
      // setTimeoutId(id);
    }
  };
  return (
    <Box>
      <Button onClick={handleOpen}>
        <AddCircleRoundedIcon fontSize="large" />
      </Button>

      {/* <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="add-task-modal"
        aria-describedby="modal-to-add-new-task"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            minWidth: "200px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Add New Task
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{
                margin: "1rem 0 0.5rem 0",
              }}
              fullWidth
              label="Title"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
              error={errors.title ? true : false}
              helperText={errors.title && errors.title?.message}
            />

            <div>
              <TextField
                sx={{
                  margin: "1rem 0 0.5rem 0",
                }}
                label="Description"
                placeholder="Enter description"
                multiline
                fullWidth
                {...register("description", {
                  required: "Description is required",
                })}
                error={errors.description ? true : false}
                helperText={errors.description && errors.description?.message}
              />
            </div>
            <div>
              <FormControl
                sx={{
                  margin: "1rem 0 0.5rem 0",
                }}
                fullWidth
                error={errors.status ? true : false}
              >
                <InputLabel id="demo-simple-select-error-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  label="Status"
                  defaultValue={""}
                  // value={register.status || ""}
                  {...register("status", { required: "Status is required" })}
                >
                  <MenuItem value={"active"}>Active</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.status && errors.status?.message}
                </FormHelperText>
              </FormControl>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                margin: "1rem 0 0 0",
              }}
            >
              Add Task
            </Button>
          </Box>
          <Stack sx={{ width: "100%", marginTop: "1rem" }}>
            {taskAdded && (
              <Alert severity="success">Task added successful</Alert>
            )}
            {errors.failed && (
              <Alert severity="error">{errors.failed?.message}</Alert>
            )}
          </Stack>
        </Box>
      </Modal> */}

      <TaskModal
        opened={open}
        onSubmit={onSubmit}
        handleClose={handleOpen}
        taskAdded={taskAdded}
        customErrors={customErrors}
      />
    </Box>
  );
};

export default AddTaskModal;
