import React, { useEffect, useState } from 'react';
import { TextField, Grid, Paper, Typography, Button, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const {user} = useAuth();
    const navigate = useNavigate()
  // Initial user state (assuming pre-populated data)
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const fetchData = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sporti-backend-live-p00l.onrender.com/api/auth/user/${user._id}`);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
 

  const handleSave = async() => {
    // Validate form data before saving
    if (!userData.name || !userData.email) {
      alert("Name and email are required");
      return;
    }
  
    try {
      const response = await axios.put(`https://sporti-backend-live-p00l.onrender.com/api/auth/user/${user._id}`, userData);
      console.log(response);
      console.log('Profile updated:', userData);
      alert("Profile updated successfully!");
      window.location.reload();
      navigate('/profile')

    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to update profile");
    }
  };
  

  return (
    <Box className="p-3 p-md-5 bg-main">
    <div className="form">
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: <AccountCircle sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Gender Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            />
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobilenumber"
              value={userData.mobilenumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Designation */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={userData.designation}
              onChange={handleChange}
              InputProps={{
                startAdornment: <WorkIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Working Status */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Working Status"
              name="workingstatus"
              value={userData.workingstatus}
              onChange={handleChange}
            />
          </Grid>

          {/* Official Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Official Address"
              name="officialaddress"
              value={userData.officialaddress}
              onChange={handleChange}
              InputProps={{
                startAdornment: <LocationOnIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Personal Mobile Number */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Personal Mobile Number"
              name="personalmobilenumber"
              value={userData.personalmobilenumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Id Card Number"
              name="idCardNo"
              value={userData.idCardNo}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* Save Button */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              className='blue-btns p-3'
              fullWidth
              startIcon={<SaveIcon />}
              onClick={handleSave}

              style={{background:'#282972'}}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </Box>
  );
};

export default EditProfile;
