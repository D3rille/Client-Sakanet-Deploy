import React from 'react';
import { DotLoader } from "react-spinners";

function LoadingComponent() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'auto',  }}>
      <DotLoader color="#2E603A" />
    </div>
  );
}

export default LoadingComponent;


{/*

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading() {
  return (
    <Box sx={{ display: 'flex' , margin:"auto"}}>
      <CircularProgress sx={{color:"green"}} />
    </Box>
  );
} */}