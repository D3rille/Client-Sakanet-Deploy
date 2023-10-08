import { Paper, Typography, Avatar, Box } from "@mui/material";

const CommunityInfo = () => {
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
        <Typography variant="subtitle1">JHAN DITO ANG COVER PHOTO</Typography>
      </Box>

      <Avatar
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

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          color: "#1A1A1A",
          mt: "4rem",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          padding:1
        }}
      >
        Quezon Farming Community
      </Typography>

      <Box sx={{ textAlign: "left", mb: "1rem",  ml:1, mr:1, mt:0.8}}>
        <Typography
          variant="caption"
          sx={{ color: "#777777", fontWeight: "bold", fontSize:'0.79em' }}
        >
          About:
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#1A1A1A", fontWeight: "bold", fontSize:'0.79em' }}
        >
          <br />
          This is a community of farmers and buyers across Quezon Province.
        </Typography>
      </Box>
    </Paper>
  );
};

export default CommunityInfo;
