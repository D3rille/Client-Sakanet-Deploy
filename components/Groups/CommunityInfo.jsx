import { Paper, Typography, Avatar, Box, IconButton } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';

import OptionsMenu from "../popups/OptionsMenu";

const CommunityInfo = ({isAdmin, data, settingsItems}) => {

  const settings = (handleClick) =>{
    return (
    <IconButton
      
      onClick={(event)=>{
        handleClick(event);
      }}
    >
        <TuneIcon/>
    </IconButton>)
  }

  // const settingsItems=[
  //   {name:"Configure", function:()=>{}},
  //   {name:"Delete Group", function:()=>{}}
  // ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        padding: 2,
        marginBottom: 2,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#FAF9F6",
      }}
    >
      {/*COVER PHOTO */}
      <Box
        sx={{
          height: "120px",
          backgroundColor: "#D8D5F7",
          marginBottom: 2,
          marginLeft: -2,
          marginRight: -2,
          marginTop: -2,
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          borderBottomLeftRadius: "inherit",
          borderBottomRightRadius: "inherit",
          position: "relative",
          zIndex: 0,
        }}
      >
        {data?.cover_photo && (<img src={data?.cover_photo ?? ""} style={{width:"100%", height:"100%", objectFit:"cover"}} />)}

      </Box>
      <Avatar
        src={data?.profile_pic}
        alt={`${data?.groupName}`}
        sx={{
          position: "absolute",
          top: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          width: "100px",
          height: "100px",
          border: "3px solid #5FBB84",
        }}
      />
      {isAdmin ? (<div style={{display:"flex", justifyContent:"end", margin:0}}>
        <OptionsMenu triggerComponent={settings} itemAndFunc={settingsItems}/>
      </div>):(<br/>)}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          color: "#1A1A1A",
          mt: "1em",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          padding:1
        }}
      >
        {data?.groupName}
      </Typography>

      <Box 
      sx={{ 
        textAlign: "left",
        paddingInline:"1em", 
        mb: "1rem",  
        ml:1, mr:1, mt:0.8, 
        maxHeight:"6em", 
        overflowY:"auto"}}>
        <Typography
          variant="caption"
          sx={{ color: "#777777", fontWeight: "bold", fontSize:'0.79em' }}
        >
          About:
        </Typography>
        <br/>
        <Typography
          variant="caption"
          sx={{ color: "#1A1A1A", fontWeight: "bold", fontSize:'0.79em' }}
        >
          {data?.groupDescription}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CommunityInfo;
