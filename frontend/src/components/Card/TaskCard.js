import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Box } from "@mui/material";
import { TaskContext } from "../../context/TaskProvider";

const TaskCard = ({ title, description, status, id }) => {
  const { deleteTaskId } = useContext(TaskContext);

  const handleUpdate = () => {

  };

  const handleDelete = (id) => {
    deleteTaskId(id);
    console.log(id)
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          {title}
        </Typography>

        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardContent sx={{ p: "0 !important" }}>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1rem 1rem 1rem",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            color={status === "active" ? "error" : "success"}
          >
            {status}
          </Button>
          <Box component={"span"}>
            <DeleteForeverRoundedIcon sx={{ ml: 1 }} onClick={()=>handleDelete(id)} />
            <EditNoteRoundedIcon sx={{ ml: 1 }} onClick={()=>handleUpdate(id)} />
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
