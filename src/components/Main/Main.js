import { Box, Button, TextField, CircularProgress, Autocomplete, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import mainStyles from "./Main.module.css";

function Main() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    dob: "",
    mobile: "",
    education: "",
    skills: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [educationOptions, setEducationOptions] = useState([
    "Harvard University",
    "Stanford University",
    "MIT",
    "Oxford University",
    "Cambridge University",
    "Delhi University",
    "IIT Bombay",
    // Add more universities/schools as needed
  ]);
  const [skillsOptions, setSkillsOptions] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "CSS",
    "HTML",
    "C++",
    // Add more skills as needed
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      education: newValue,
    }));
  };

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      skills: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const validateForm = () => {
    const { username, email, address, dob, mobile, education, skills } = formData;  

    // Check if required fields are filled
    if (!username || !email || !address || !dob || !mobile || !education || skills.length === 0) {
      return "All fields are required!";
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }

    // Validate mobile number for +91 (India) format
    const mobileRegex = /^\+91\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return "Mobile number should start with +91 followed by 10 digits!";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    setLoading(true);

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

      const result = await response.json();
      console.log("Form submitted successfully", result);

      setFormData({
        username: "",
        email: "",
        address: "",
        dob: "",
        mobile: "",
        education: "",
        skills: [],
      });
    } catch (error) {
      console.error("Error during form submission", error);
      setError("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={mainStyles.container}>
        <div className={mainStyles.wrapper}>
          <h3>Admin Panel Form</h3>
          <Box component="form" onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}

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
            <TextField
              label="Date of Birth"
              variant="outlined"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* Country Field: Fixed to India */}
            <TextField
              label="Country"
              variant="outlined"
              name="country"
              value="India" // Fixed to India
              disabled
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              fullWidth
              sx={{ my: 1 }}
            />

            {/* Education Field with Autocomplete */}
            <Autocomplete
              value={formData.education}
              onChange={handleEducationChange}
              options={educationOptions}
              renderInput={(params) => <TextField {...params} label="Education" variant="outlined" fullWidth />}
              sx={{ my: 1 }}
            />

            {/* Skills Field with Select */}
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Skills</InputLabel>
              <Select
                multiple
                value={formData.skills}
                onChange={handleSkillsChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {skillsOptions.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />}
                disabled={loading}
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
