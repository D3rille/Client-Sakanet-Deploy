import { useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";  


const ProductCategories = () => {
  const [productsSortBy, setProductsSortBy] = useState(null); 
  const handleProductsSortChange = (event) => {
    setProductsSortBy(event.target.value);
  };

  return (
    <div
      style={{
        marginTop:'2rem',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: "10px",
        marginLeft: "2rem",
      }}
    >
      <Typography style={{ marginRight: "10px", fontSize: "15px" }}>
        Product Categories:
      </Typography>
      <Select
        value={productsSortBy}
        onChange={handleProductsSortChange}
        displayEmpty
        style={{
          height: "40px",
          minWidth: "160px",
          borderRadius: "10px",
          backgroundColor: "#FEFEFF",
        }}
        IconComponent={ArrowDropDownIcon}
        sx={{
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2E603A',
          },
        }}
      >
        <MenuItem value={"available"}>Product Category 1</MenuItem>
        <MenuItem value={"suggested"}>Produt Category 2</MenuItem>
      </Select>
    </div>
  );
};

export default ProductCategories;
