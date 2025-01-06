import { Box, Button, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import mainStyles from "./Main.module.css";

function Main() {
  return (
    <>
      <div className={mainStyles.container}>
        {/* 
        1.username
        2.contry
        3.dob
        4.email
        5.mobile number
        6.address
         */}
        <div className={mainStyles.wrapper}>
          <h3>Admin panel Form</h3>
          <Box component="form">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              label="Email-Id"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              id="outlined-textarea"
              label="Address"
              placeholder="Enter your address"
              multiline
              fullWidth
              sx={{ my: 1 }}
            />
            <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Main;
