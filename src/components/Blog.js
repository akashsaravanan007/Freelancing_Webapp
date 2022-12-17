import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
const Blog = ({
  title,
  description,
  payment,
  userName,
  email,
  isUser,
  id,
  uploadTime,
  requirements,
  deadline,
  negotiable,
  contactno,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5001/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/myBlogs"));
  };
  return (
    <div>
      {" "}
      <Card
        style={{ backgroundColor: "#f5f6fa" }}
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "brown" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={userName}
          subheader={email}
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            textAlign="center"
            className={classes.font}
            variant="body2"
            color="DarkBlue"
            fontSize="22px"
          >
            <b>{title}</b>
          </Typography>
          <br />
          <Typography>
            <b>Description</b> {": "}
            {description}
          </Typography>
          <br />
          <Typography>
            <b>Requirements</b> {": "}
            {requirements}
          </Typography>

          <Typography>
            <b>Negotiable</b> {": "}
            {negotiable}
          </Typography>

          <Typography>
            <b>Payment(₹)</b> {": "}
            {payment}
          </Typography>

          <Typography>
            <b>Deadline On</b> {": "}
            {deadline}
          </Typography>

          <Typography>
            <b>Posted On</b> {": "}
            {uploadTime}
          </Typography>
        </CardContent>

        <Typography
        textAlign="center"
        className={classes.font}
        variant="inherit"
        color="red"
        fontSize="15px"
      >
        <b>Contact Details</b>
        <br/>
        <b>{email}</b>
        <br/>
        <b>{contactno}</b>
      </Typography>
      </Card>
    </div>
  );
};

export default Blog;
