import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { GET_MY_PROFILE } from '../graphql/queries/userProfileQueries';

const UserProfileCard = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { profile_pic, username, address, is_verified, role, rating, ratingStatistics } = data.getMyProfile;

  const profilePicStyle = {
    width: '120px', // Adjust the size as needed
    height: '120px', // Adjust the size as needed
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto',
    display: 'block',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <Card style={{ maxWidth: '400px' }} elevation={3}>
        <CardMedia
          component="img"
          alt={username}
          image={profile_pic}
          title={username}
          style={profilePicStyle}
        />
        <CardContent>
          <Typography variant="h6">{username}</Typography>
          <Typography gutterBottom>Address: {address.street}, {address.barangay}, {address.cityOrMunicipality}, {address.province}, {address.region}</Typography>
          <Typography variant="body2" color="textSecondary">
            Verified: {is_verified ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rating: {rating}
          </Typography>
          {ratingStatistics ? (
            <React.Fragment>
              <Typography variant="subtitle2">Rating Statistics:</Typography>
              <Typography variant="body2">
                One Star: {ratingStatistics.oneStar}
              </Typography>
              <Typography variant="body2">
                Two Stars: {ratingStatistics.twoStar}
              </Typography>
              {/* ... More rating statistics ... */}
            </React.Fragment>
          ) : (
            <Typography variant="body2">No rating statistics available.</Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileCard;
