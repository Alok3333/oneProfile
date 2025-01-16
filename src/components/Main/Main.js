import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import mainStyles from "./Main.module.css";

function Main() {
  const [formData, setFormData] = useState({
    pid: "",
    username: "",
    email: "",
    address: "",
    userId: "",
    dob: "",
    mobile: "",
    education: "",
    distict: "",
    skills: [],
    percentage: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [boardOptions, setBoardOptions] = useState([
    "SSC Maharastra",
    "SSC Gujrat",
    "CBSE",
    "ICSE",
  ]);

  const [districtOptions, setDistrictOptions] = useState([
    "Mumbai",
    "Bangluru",
  ]);

  const [stateOptions, setStateOptions] = useState(["Maharastra", "Karnataka"]);

  const [schoolOptions, setSchoolOptions] = useState([
    "ritesh paatsala",
    "swami vivekanand hindi/english high school",
    "aasrivad high school",
  ]);

  const [collegeOptions, setCollegeOptions] = useState([
    "Shivaji junior college, Renapur, Latur",
    "Dyanand college, Latur",
  ]);

  const [graduationCollegeOptions, setGraduationCollegeOptions] = useState([
    "Sahayog College Thane.",
    "P V Ritesh College Thane.",
    "COCSIT College , Latur.",
  ]);

  const [collegeClassOptions, setCollegeClassOptions] = useState([
    "Class 11th",
    "Class 12th",
  ]);

  const [boardOptions2, setBoardOptions2] = useState([
    "HSC Maharastra",
    "HSC Gujrat",
    "CBSE",
    "ICSE",
  ]);

  const [boardOptions3, setBoardOptions3] = useState([
    "Science",
    "Commerce",
    "Art",
  ]);

  const [uniBranchOptions, setUniBranchOptions] = useState([
    "BSC",
    "B.Tech",
    "M.Tech",
    "BCA",
    "MCA",
  ]);

  const [semeterOptions, setSemeterOptions] = useState([
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
  ]);

  const [mediumOptions, setMediumOptions] = useState([
    "Marathi",
    "Hindi",
    "English",
  ]);
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
  const [langOptions, setLangOptions] = useState([
    "Hindi",
    "Marathi",
    "English",
  ]);

  // Generate a list of year ranges from 2000 to the current year
  const generateYearRanges = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = 1990; year < currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  const yearOptions = generateYearRanges();

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
    const {
      pid,
      username,
      email,
      userId,
      address,
      dob,
      mobile,
      education,
      skills,
      percentage,
      year,
    } = formData;

    // Check if required fields are filled
    if (
      !pid ||
      !userId ||
      !username ||
      !email ||
      !address ||
      !dob ||
      !mobile ||
      !education ||
      skills.length === 0
    ) {
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

    // Validate percentage (0 to 100)
    const percentageValue = parseFloat(percentage);
    if (
      isNaN(percentageValue) ||
      percentageValue < 0 ||
      percentageValue > 100
    ) {
      return "Please enter a valid percentage between 0 and 100!";
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
        pid: "",
        username: "",
        email: "",
        userId: "",
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
          {/* <h3>Admin Panel Form</h3> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <h4 className={mainStyles.heading}>Information</h4>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="PID"
                        variant="outlined"
                        name="pid"
                        value={formData.pid}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="User-Id"
                        variant="outlined"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="Country"
                        variant="outlined"
                        name="country"
                        value="India" // Fixed to India
                        disabled
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="Mobile Number"
                        variant="outlined"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="Fullname"
                        variant="outlined"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email-Id"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.distict || districtOptions[0]}
                        onChange={handleEducationChange}
                        options={districtOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Distict"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || stateOptions[0]}
                        onChange={handleEducationChange}
                        options={stateOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* School details */}
                    <Grid item xs={12} md={12}>
                      <h4 className={mainStyles.heading}>School Details</h4>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || schoolOptions[1]}
                        onChange={handleEducationChange}
                        options={schoolOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="School Name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Class"
                        variant="outlined"
                        name="class"
                        value="10th" // Fixed to India
                        disabled
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || boardOptions[0]}
                        onChange={handleEducationChange}
                        options={boardOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Board"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || mediumOptions[2]}
                        onChange={handleEducationChange}
                        options={mediumOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Medium"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || yearOptions[31]}
                        onChange={handleEducationChange}
                        options={yearOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Year"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* Percentage Field */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Percentage"
                        variant="outlined"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                        inputProps={{
                          inputMode: "numeric", // Ensures a numeric input field on mobile
                          pattern: "[0-9]*", // Optional pattern for numeric validation
                        }}
                      />
                    </Grid>

                    {/* College details */}
                    <Grid item xs={12} md={12}>
                      <h4
                        style={{ marginBottom: "10px" }}
                        className={mainStyles.heading}
                      >
                        College Details
                      </h4>
                      <h4>11th</h4>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || collegeOptions[0]}
                        onChange={handleEducationChange}
                        options={collegeOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || collegeClassOptions[0]}
                        onChange={handleEducationChange}
                        options={collegeClassOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Classes"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                      <TextField
                        label="Class 11"
                        variant="outlined"
                        name="class"
                        value={formData.address}
                        onChange={handleInputChange}
                        multiline
                        fullWidth
                        sx={{ my: 1 }}
                      />
                    </Grid> */}

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || boardOptions2[0]}
                        onChange={handleEducationChange}
                        options={boardOptions2}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Board"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || boardOptions3[0]}
                        onChange={handleEducationChange}
                        options={boardOptions3}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Branch"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || yearOptions[32]}
                        onChange={handleEducationChange}
                        options={yearOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Year"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* Percentage Field */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Percentage"
                        variant="outlined"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                        inputProps={{
                          inputMode: "numeric", // Ensures a numeric input field on mobile
                          pattern: "[0-9]*", // Optional pattern for numeric validation
                        }}
                      />
                    </Grid>

                    {/* College details */}
                    <Grid item xs={12} md={12}>
                      <h4>12th</h4>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || collegeOptions[0]}
                        onChange={handleEducationChange}
                        options={collegeOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || collegeClassOptions[0]}
                        onChange={handleEducationChange}
                        options={collegeClassOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Classes"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || boardOptions2[0]}
                        onChange={handleEducationChange}
                        options={boardOptions2}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Board"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || boardOptions3[0]}
                        onChange={handleEducationChange}
                        options={boardOptions3}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Branch"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || yearOptions[32]}
                        onChange={handleEducationChange}
                        options={yearOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Year"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* Percentage Field */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Percentage"
                        variant="outlined"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                        inputProps={{
                          inputMode: "numeric", // Ensures a numeric input field on mobile
                          pattern: "[0-9]*", // Optional pattern for numeric validation
                        }}
                      />
                    </Grid>

                    {/* University details */}
                    <Grid item xs={12} md={12}>
                      <h4 className={mainStyles.heading}>Graduation Details</h4>
                    </Grid>

                    {/* Graduation college name */}
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={
                          formData.education || graduationCollegeOptions[0]
                        }
                        onChange={handleEducationChange}
                        options={graduationCollegeOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Graduation College Name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* University name */}
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education}
                        onChange={handleEducationChange}
                        options={educationOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select University Name"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || semeterOptions[0]}
                        onChange={handleEducationChange}
                        options={semeterOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Semester"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || uniBranchOptions[3]}
                        onChange={handleEducationChange}
                        options={uniBranchOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Branch"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.education || yearOptions[33]}
                        onChange={handleEducationChange}
                        options={yearOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Year"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                        sx={{ my: 1 }}
                      />
                    </Grid>

                    {/* Percentage Field */}
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Percentage"
                        variant="outlined"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ my: 1 }}
                        inputProps={{
                          inputMode: "numeric", // Ensures a numeric input field on mobile
                          pattern: "[0-9]*", // Optional pattern for numeric validation
                        }}
                      />
                    </Grid>

                    {/* Skills Field with Select */}
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel>Select Language</InputLabel>
                        <Select
                          multiple
                          value={formData.skills}
                          onChange={handleSkillsChange}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {langOptions.map((skill) => (
                            <MenuItem key={skill} value={skill}>
                              {skill}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          my: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          endIcon={
                            loading ? (
                              <CircularProgress size={24} />
                            ) : (
                              <SendIcon />
                            )
                          }
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Main;
