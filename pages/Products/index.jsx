import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Divider,
  TextField,
  Checkbox,
  FormGroup,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/products.module.css";
import ProductGrid from "../../components/ProductGrid";
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function Products() {
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [otherLocation, setOtherLocation] = useState("");
  const [checkedOther, setCheckedOther] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleInputChange = (index, event) => {
    const values = [...priceRange];
    values[index] = Number(event.target.value);
    setPriceRange(values);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.name === "Other (Indicate)") {
      setCheckedOther(event.target.checked);
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setPriceRange([20, 80]);
    setCheckedOther(false);
    setSelectedDate(new Date());
    setOtherLocation("");
  };

  return (
    <Grid container className={styles.gridContainer}>
      <Grid item xs={12}>
        <Paper elevation={3} className={styles.paperContainer}>
          {/* Header Section */}
          <div className={styles.topRowContainer}>
            <Typography
              className={styles.topRowLeft}
              variant="body1"
              style={{ marginLeft: "3rem" }}
            >
              Filters
            </Typography>
          </div>

          {/* Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Paper
              elevation={3}
              className={styles.innerPaperLeft}
              sx={{ borderRadius: "13px", padding: "1rem" }}
            >
              <Typography sx={{ fontSize: "14px", marginBottom: "1rem" }}>
                Mode of Delivery
              </Typography>
              <RadioGroup
                aria-label="mode-of-delivery"
                name="mode-of-delivery"
                value={sortBy}
                onChange={handleChange}
                flexDirection="column"
                sx={{ marginLeft: "1rem", marginBottom: "1rem" }}
              >
                <FormControlLabel
                  value="Pick Up"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2F603B" } }} />
                  }
                  label={
                    <Typography sx={{ fontSize: "12px" }}>Pick Up</Typography>
                  }
                />
                <FormControlLabel
                  value="Delivery"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2F603B" } }} />
                  }
                  label={
                    <Typography sx={{ fontSize: "12px" }}>Delivery</Typography>
                  }
                />
                <FormControlLabel
                  value="All"
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#2F603B" } }} />
                  }
                  label={<Typography sx={{ fontSize: "12px" }}>All</Typography>}
                />
              </RadioGroup>
              <Divider sx={{ marginBottom: "1rem" }} />
              <Typography sx={{ fontSize: "14px", marginBottom: "1rem" }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiSlider-track": {
                    bgcolor: "#2F603B",
                  },
                  "& .MuiSlider-thumb": {
                    color: "#2F603B",
                  },
                  "& .MuiSlider-rail": {
                    bgcolor: "#ECEDEC",
                  },
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Min"
                  value={priceRange[0]}
                  onChange={(e) => handleInputChange(0, e)}
                  style={{ width: "45%" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#2F603B" },
                      "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Max"
                  value={priceRange[1]}
                  onChange={(e) => handleInputChange(1, e)}
                  style={{ width: "45%" }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#2F603B" },
                      "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                    },
                  }}
                />
              </div>
              <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }} />
              <Typography sx={{ fontSize: "14px", marginBottom: "1rem" }}>
                Location/Area
              </Typography>
              <FormGroup>
                {[
                  "Agdangan",
                  "Alabat",
                  "Atimonan",
                  "Calauag",
                  "Candelara",
                  "Catanauan",
                  "Gumaca",
                  "Infanta",
                  "Lopez",
                  "Lucban",
                  "Lucena City",
                  "Mauban",
                  "Padre Burgos",
                  "Pagbilao",
                  "Other (Indicate)",
                ].map((area, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        onChange={handleCheckboxChange}
                        name={area}
                        sx={{ "&.Mui-checked": { color: "#2F603B" } }}
                      />
                    }
                    label={area}
                  />
                ))}
                {checkedOther && (
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={otherLocation}
                    onChange={(e) => setOtherLocation(e.target.value)}
                    label="Specify other location/area"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#2F603B" },
                        "&.Mui-focused fieldset": { borderColor: "#2F603B" },
                      },
                    }}
                  />
                )}
              </FormGroup>
              <Divider sx={{ marginTop: "1rem" }} />

        <Typography
          sx={{
            fontSize: "14px",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          Time Limit
        </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#2F603B",
                  marginTop: "2rem",
                  width: "100%",
                }}
                onClick={resetFilters}
              >
                CLEAR ALL FILTERS
              </Button>
            </Paper>
            <div className={styles.parentContainer}>
              <Paper elevation={3} className={styles.innerPaperRight}>
                <div className={styles.logosearchbar}>
                  <TextField
                    size="small"
                    type="text"
                    fullWidth
                    className={styles.searchicon}
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "#FFFEFE",
                      justifyItems: "right",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                          borderRadius: "30px",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "10px 10px 10px 15px", // Adds padding for the text to be inside
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search"
                  />
                </div>
              </Paper>
              <div className={styles.productGridContainer}>
                <ProductGrid />
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
