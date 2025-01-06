// import { Box, Button, TextField } from "@mui/material";
// import React, { useState } from "react";
// import SendIcon from "@mui/icons-material/Send";
// import mainStyles from "./Main.module.css";

// function Main() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     address: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // submit syntax
//     console.log(formData);
//   };
//   return (
//     <>
//       <div className={mainStyles.container}>
//         {/* 
//         1.username - done
//         2.contry 
//         3.dob
//         4.email - done
//         5.mobile number
//         6.address - done
//          */}
//         <div className={mainStyles.wrapper}>
//           <h3>Admin panel Form</h3>
//           <Box component="form">
//             <TextField
//               label="Username"
//               variant="outlined"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ my: 1 }}
//             />
//             <TextField
//               label="Email-Id"
//               variant="outlined"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ my: 1 }}
//             />
//             <TextField
//               id="outlined-textarea"
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Enter your address"
//               multiline
//               fullWidth
//               sx={{ my: 1 }}
//             />
//             <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
//               <Button
//                 variant="contained"
//                 color="success"
//                 endIcon={<SendIcon />}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Main;

import { Box, Button, TextField, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import mainStyles from "./Main.module.css";

function Main() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error message

  // Handle input change and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation function
  const validateForm = () => {
    const { username, email, address } = formData;
    if (!username || !email || !address) {
      return "All fields are required!";
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(""); // Clear error

    setLoading(true); // Set loading state

    try {
      // API call to submit data (replace URL with actual API)
      const response = await fetch("https://your-api-url.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      // Handle successful submission
      const result = await response.json();
      console.log("Form submitted successfully", result);

      // Optionally, reset the form or show a success message
      setFormData({
        username: "",
        email: "",
        address: "",
      });

    } catch (error) {
      // Handle error during API call
      console.error("Error during form submission", error);
      setError("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className={mainStyles.container}>
        <div className={mainStyles.wrapper}>
          <h3>Admin Panel Form</h3>
          <Box component="form" onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              label="Email-Id"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              multiline
              fullWidth
              sx={{ my: 1 }}
            />

            <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Main;

