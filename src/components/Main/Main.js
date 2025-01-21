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
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import mainStyles from "./Main.module.css";
import ButtonComponent from "../Button/ButtonComponent";

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
    state: "",
    schoolName: "",
    collegeName: "",
    selectBoard: "",
    selectBoard2: "",
    selectMedium: "",
    selectYear: "",
    selectClasses: "",
    selectBranch: "",
    selectYear2: "",
    collegeName2: "",
    selectClasses2: "",
    selectBoard3: "",
    selectBranch2: "",
    selectYear3: "",
    graduation: "",
    selectUniversity: "",
    selectSem: "",
    selectBranch3: "",
    selectYear4: "",
    skills: [],
    percentage1: "",
    percentage2: "",
    percentage3: "",
    percentage4: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for random string
  const [randomStr, setRandomStr] = useState("");

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
    "Ritesh paatsala",
    "Swami vivekanand hindi/english high school",
    "Aasrivad high school",
  ]);

  const [mediumOptions, setMediumOptions] = useState([
    "Marathi",
    "Hindi",
    "English",
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

  const [boardOptions12, setBoardOptions12] = useState([
    "HSC Maharastra",
    "HSC Gujrat",
    "CBSE",
    "SSC",
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

  const handleEducationChange = (field) => (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      skills: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Function for generate random string
  const randomStringGenerator = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";

    // Generate 2 Alphabet char
    const randomAlphabetChar = Array.from({length: 2}, () => 
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join("");

    // Generate 4 Digits number
    const randomDigitNum = Array.from({length: 4}, () => 
      digits.charAt(Math.floor(Math.random() * digits.length))
    ).join("");

    const result = randomAlphabetChar + randomDigitNum;
    setRandomStr(result);

    // console.log(randomAlphabetChar + randomDigitNum, "al")
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        className={mainStyles.heading}
                        style={{ margin: 0, textAlign: "right" }}
                      >
                        Information
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <ButtonComponent name="add" />
                      </div>{" "}
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="PID"
                        variant="outlined"
                        name="pid"
                        value={randomStr}
                        // onChange={handleInputChange}
                        disabled
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                sx={{ backgroundColor: "#8174A0" }}
                                variant="contained"
                                onClick={randomStringGenerator}
                              >
                                Generate Pid
                              </Button>
                            </InputAdornment>
                          ),
                        }}
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
                        onChange={handleEducationChange("distict")}
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
                        value={formData.state || stateOptions[0]}
                        onChange={handleEducationChange("state")}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        className={mainStyles.heading}
                        style={{ margin: 0, textAlign: "right" }}
                      >
                        School Details
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <ButtonComponent name="add" />
                      </div>{" "}
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.schoolName || schoolOptions[1]}
                        onChange={handleEducationChange("schoolName")}
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
                        value={formData.selectBoard || boardOptions[0]}
                        onChange={handleEducationChange("selectBoard")}
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
                        value={formData.selectMedium || mediumOptions[2]}
                        onChange={handleEducationChange("selectMedium")}
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
                        value={formData.selectYear || yearOptions[31]}
                        onChange={handleEducationChange("selectYear")}
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
                        name="percentage1"
                        value={formData.percentage1}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        className={mainStyles.heading}
                        style={{ margin: 0, textAlign: "right" }}
                      >
                        College Details
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <ButtonComponent name="add" />
                      </div>{" "}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <h4>11th</h4>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={formData.collegeName || collegeOptions[0]}
                        onChange={handleEducationChange("collegeName")}
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
                        value={formData.selectClasses || collegeClassOptions[0]}
                        onChange={handleEducationChange("selectClasses")}
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
                        value={formData.selectBoard2 || boardOptions2[0]}
                        onChange={handleEducationChange("selectBoard2")}
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
                        value={formData.selectBranch || boardOptions3[0]}
                        onChange={handleEducationChange("selectBranch")}
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
                        value={formData.selectYear2 || yearOptions[32]}
                        onChange={handleEducationChange("selectYear2")}
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
                        name="percentage2"
                        value={formData.percentage2}
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
                        value={formData.collegeName2 || collegeOptions[0]}
                        onChange={handleEducationChange("collegeName2")}
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
                        value={
                          formData.selectClasses2 || collegeClassOptions[0]
                        }
                        onChange={handleEducationChange("selectClasses2")}
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
                        value={formData.selectBoard3 || boardOptions12[0]}
                        onChange={handleEducationChange("selectBoard3")}
                        options={boardOptions12}
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
                        value={formData.selectBranch2 || boardOptions3[0]}
                        onChange={handleEducationChange("selectBranch2")}
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
                        value={formData.selectYear3 || yearOptions[32]}
                        onChange={handleEducationChange("selectYear3")}
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
                        name="percentage3"
                        value={formData.percentage3}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4
                        className={mainStyles.heading}
                        style={{ margin: 0, textAlign: "right" }}
                      >
                        Graduation Details
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <ButtonComponent name="add" />
                      </div>{" "}
                    </Grid>

                    {/* Graduation college name */}
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        value={
                          formData.graduation || graduationCollegeOptions[0]
                        }
                        onChange={handleEducationChange("graduation")}
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
                        value={formData.selectUniversity}
                        onChange={handleEducationChange("selectUniversity")}
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
                        value={formData.selectSem || semeterOptions[0]}
                        onChange={handleEducationChange("selectSem")}
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
                        value={formData.selectBranch3 || uniBranchOptions[3]}
                        onChange={handleEducationChange("selectBranch3")}
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
                        value={formData.selectYear4 || yearOptions[33]}
                        onChange={handleEducationChange("selectYear4")}
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
                        name="percentage4"
                        value={formData.percentage4}
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
                          sx={{
                            backgroundColor: "#8174A0",
                          }}
                          // color="success"
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
