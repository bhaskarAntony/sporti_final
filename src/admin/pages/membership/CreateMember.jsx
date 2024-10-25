import React, { useEffect, useState } from 'react';
import { TextField, Grid, Paper, Typography, Button, Box, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/popup/Loading';
import { toast } from 'react-toastify';

const CreateMember = () => {
  // Initial user state (assuming pre-populated data)
  const [userData, setUserData] = useState({
  name: '',
  email:'',
  password: '',
  gender:'',
  mobilenumber:'',
  designation:'',
  workingstatus:'',
  officialaddress:'',
  personalmobilenumber:'',
  idCardNo:''
  });
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


 

  const handleSave = async() => {
    setLoading(true)
    // Validate form data before saving
    if (!userData.name || !userData.email) {
      alert("Name and email are required");
      return;
    }
  
    try {
      const response = await axios.post(`https://sporti-backend-live-p00l.onrender.com/api/auth/register`, userData);
      console.log(response);
      setLoading(false);
    //   showSnack(true, 'Member created successfully!')
    toast.success('Member created successfully!')
      console.log('Profile updated:', userData);
    //   alert("Member created successfully!");
    setOpen(true)
      navigate('/admin')
    } catch (error) {
        setLoading(false);
        toast.error(`Error member creation.  please check and try later.`)
      console.error('Error member creation:', error);
    //   alert("Failed to create member");
    }
  };
 

  if(loading){
    return <Loading/>
  }
  

  return (
    <Box className="p-3 p-md-5 bg-light">
       
     <div className="row form">
        <div className="col-md-6 m-auto">
        <Paper elevation={3} sx={{ p: 4,  margin: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Create new member
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={userData.password}
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
              label="Add Id Card numberr"
              name="idCardNo"
              value={userData.idCardNo}
              onChange={handleChange}
            //   InputProps={{
            //     startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
            //   }}
            />
          </Grid>

          {/* Save Button */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              
              fullWidth
              startIcon={<SaveIcon />}
              onClick={handleSave}
              className='main-btn'
            >
              Create member
            </Button>
          </Grid>
        </Grid>
      </Paper>
        </div>
     </div>
    </Box>
  );
};

export default CreateMember;
