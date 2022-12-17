import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import "../App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    payment: "",
    requirements: "",
    deadline: new Date(),
    negotiable: "",
    contactno: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDate = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      ["deadline"]: e,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5001/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        payment: inputs.payment,
        requirements: inputs.requirements,
        deadline: inputs.deadline,
        negotiable: inputs.negotiable,
        contactno: inputs.contactno,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };
  return (
    <div style={{ marginTop: "5%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit}>
          <Box
            style={{ backgroundColor: "#ffffff" }}
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"50%"}
          >
            <Typography
              className={classes.font}
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post an Project Requirement
            </Typography>
            <InputLabel className={classes.font} sx={labelStyles}>
              Title
            </InputLabel>
            <TextField
              className={classes.font}
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel className={classes.font} sx={labelStyles}>
              Description
            </InputLabel>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              className={classes.font}
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />
            <InputLabel className={classes.font} sx={labelStyles}>
              Payment
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
              label="Amount"
              className={classes.font}
              name="payment"
              onChange={handleChange}
              value={inputs.payment}
              margin="auto"
              variant="outlined"
            />
            <InputLabel className={classes.font} sx={labelStyles}>
              Requirements
            </InputLabel>
            <TextField
              className={classes.font}
              multiline
              rows={4}
              name="requirements"
              onChange={handleChange}
              value={inputs.requirements}
              margin="auto"
              variant="outlined"
            />
            <InputLabel className={classes.font} sx={labelStyles}>
              Deadline
            </InputLabel>

            <DesktopDatePicker
              className={classes.font}
              label="Date desktop"
              inputFormat="DD/MM/YYYY"
              value={inputs.deadline}
              onChange={handleDate}
              renderInput={(params) => <TextField {...params} />}
            />

            <InputLabel id="demo-simple-select-label">Negotiable</InputLabel>
            <Select
              name="negotiable"
              label="Negotiable"
              onChange={handleChange}
              type="negotiable"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputs.role}
              placeholder="Select Your negotiable"
              margin="normal"
            >
              <MenuItem value={1}>yes</MenuItem>
              <MenuItem value={2}>no</MenuItem>
            </Select>

            <InputLabel className={classes.font} sx={labelStyles}>
              Contact Details
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">📞</InputAdornment>
              }
              label="Amount"
              inputProps= {{maxLength:10}}
              className={classes.font}
              name="contactno"
              onChange={handleChange}
              value={inputs.contactno}
              margin="auto"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default AddBlog;
