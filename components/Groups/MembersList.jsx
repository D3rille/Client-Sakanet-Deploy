import { Paper, Avatar, Grid, Typography, ButtonBase } from '@mui/material';

const MembersList = () => {
  const members = Array(9).fill(null); 

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, backgroundColor: '#FAF9F6',  }}>
      <Typography variant="body" sx={{ fontSize:'0.89em', fontWeight:'bold', textAlign:'left' }}>Members</Typography>
      <Grid container spacing={2} justifyContent="center" sx={{mt:1, textAlign: 'center'}}>
        {members.map((_, index) => (
          <Grid item xs={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonBase onClick={() => console.log(`Avatar ${index + 1} clicked`)}>
              <Avatar />
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
        <a href="#view-all" style={{ textDecoration: 'none', color: '#1A1A1A', fontSize: '0.9em' }}>
          View all
        </a>
      </Typography>
    </Paper>
  );
};

export default MembersList;
