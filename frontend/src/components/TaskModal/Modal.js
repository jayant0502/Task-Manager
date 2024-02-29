// TaskModal.js
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Modal,
  FormHelperText,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";


const TaskModal = ({ opened, handleClose, onSubmit, isUpdate, taskAdded , customError}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    await onSubmit(data);
  };

  console.log(errors);

  return (
    <Modal
      open={opened}
      onClose={handleClose}
      aria-labelledby={isUpdate ? "update-task-modal" : "add-task-modal"}
      aria-describedby={
        isUpdate ? "modal-to-update-task" : "modal-to-add-new-task"
      }
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
          {isUpdate ? "Update Task" : "Add New Task"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
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
            {isUpdate ? "Update Task" : "Add Task"}
          </Button>
        </Box>

        <Stack sx={{ width: "100%", marginTop: "1rem" }}>
          {taskAdded && <Alert severity="success">Task added successful</Alert>}
          {customError?.message && (
            <Alert severity="error">{customError?.message}</Alert>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default TaskModal;
