import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Avatar, List, ListItem, ListItemText, Divider, IconButton, Card } from '@mui/material';
import { Email, Phone, Business, Work, Home, Edit, Person, PhoneIphone } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './style.css'
import { ChevronRight, CheckCircle, Pending, History } from '@mui/icons-material';
import logo from '../../assets/images/main_logo.jpg' //sporti log
import { useLocation } from 'react-router-dom';

function Profile() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const location = useLocation();

    const fetchBookings = async () => {
        
        try {
          const response = await axios.get('https://sporti-backend-live-p00l.onrender.com/api/sporti/service/bookings');
          setBookings(response.data.filter((item)=>(item.email).toLowerCase() == user.email));
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      useEffect(()=>{
        fetchBookings(); 
      })

   

    return (
        <Box sx={{ padding: { xs: 2, md: 5 }, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Profile Header */}
            <Paper elevation={3} sx={{ padding: 3, textAlign:'center', gap: 3, backgroundColor: '#433878' }}>
                <Avatar sx={{ width: 80, height: 80, backgroundColor: '#ffffff', margin:'auto' }} className='mb-4'>
                    <Person sx={{ fontSize: 60, color: '#433878' }} />
                </Avatar>
                <Box>
                    <Typography variant="h4" color="white">
                        {user?.name || "Not added"}
                    </Typography>
                    <Typography variant="body1" color="white" className='lower'>
                        <Email sx={{ verticalAlign: 'middle' }} /> {user?.email || "Not added"}
                    </Typography>
                </Box>
            </Paper>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Left Section: User Details */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" gutterBottom style={{backgroundColor:'#433878', padding:10,color:'#fff', borderRadius:100}}>
                            <Person sx={{ verticalAlign: 'middle', mr: 1 }} /> Details
                        </Typography>
                        <Divider />
                        <List>
                            <ListItem>
                                <Person sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Username" secondary={user?.name || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Email sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Email" secondary={user?.email || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Phone sx={{ mr: 2 }} style={{color:'#433878'}}  />
                                <ListItemText primary="Phone Number" secondary={user?.mobilenumber || "Not added"} />
                            </ListItem>
                            <ListItem>
                                <Person sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Gender" secondary={user?.gender || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Work sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Designation" secondary={user?.designation || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Business sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Working Status" secondary={user?.workingstatus || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Home sx={{ mr: 2 }} style={{color:'#433878'}}  />
                                <ListItemText primary="Official Address" secondary={user?.officialaddress || "Not added"} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <PhoneIphone sx={{ mr: 2 }} style={{color:'#433878'}} />
                                <ListItemText primary="Personal Phone Number" secondary={user?.personalmobilenumber || "Not added"} />
                            </ListItem>
                        </List>
                    </Paper>

                    {/* Edit Profile Section */}
                    <Paper elevation={3} sx={{ padding: 2, marginTop: 3, backgroundColor: '#433878', color: 'white', cursor: 'pointer' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Edit Profile</Typography>
                           <a href="/edit/profile">
                           <IconButton>
                                <Edit sx={{ color: 'white' }} />
                            </IconButton>
                           </a>
                        </Box>
                    </Paper>
                </Grid>

                {/* Right Section: Placeholder for other content */}
                <Grid item xs={12} md={8}>
      <Paper elevation={3} sx={{ padding: 1, height: '100%' }} className='p-3 p-md-4'>
        <Typography variant="h6" gutterBottom>Virtual Identity card</Typography>
        <hr />

        <div className="row">
            <div className="col-md-6 mb-3">
                <div className="idCard text-center h-100">
                    <img src={logo} alt="" style={{width:100}} /> <br />
                    <small className="small d-block mt-2">ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ</small>
                    <small className="small d-block">Senior Police Officers Research and Training Institute</small>
                    <br />
                    <i class="bi bi-person-circle" style={{fontSize:'5rem'}}></i>
                <h5 className="fs-5 text-center mt-3" style={{letterSpacing:2, fontWeight:800}}>{(user?.name)?.toUpperCase()}</h5>
                <h6 className="fs-6 text-center">code: {user?.idCardNo}</h6>
                <h1 className="display-4 sporti-name text-center mt-3">SPORTI</h1>
                </div>
            </div>
            <div className="col-md-6 mb-3">
            <div className="idCard text-center h-100">
                    
                   
                   <div className='text-center'>
                   <img src={logo} alt="" style={{width:100}} /> <br />
                    <p className="fs-6 d-block mt-2 green text-center fw-bold">SPORTI, KARNATAKA</p>
                    <small className="terms mb-3">TERMS AND CONDITIONS</small><br />
                   <small className="v-small mt-4">This card is not transferable</small><br />
                    <div className="bar"></div>
                    <small className="v-small">Usage of this card subject to terms & conditions of club</small>
                    <div className="bar"></div>
                    <small className="v-small">This is card is property of SPORTI. Karnataka</small>
                    <div className="bar"></div>
                    <small className="v-small">If found please return to below address.</small>
                   </div>
                    <br />
                    <small className="small d-block">Senior Police Officers Research and Training Institute <br />#1, Primrose Road. Ashok Nagar, Bengaluru-560 025</small>
                <h6 className="fs-6 text-center green mt-2">ISSUED BY: Secretary SPORTI</h6>
                    <br />
                    <div className="qr-code bg-white p-3">
                    <i class="bi bi-qr-code text-dark" style={{fontSize:'5rem'}}></i>
                    </div>
                </div>
            </div>
        </div>

        {/* Bookings Overview */}
       
      </Paper>
    </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Confirmed Bookings */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, backgroundColor: '#FFB38E', textAlign: 'center', color: 'white' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {bookings.length}
              </Typography>
              <Typography variant="body1">Total Bookings</Typography>
            </Card>
          </Grid>

          {/* Pending Bookings */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, backgroundColor: '#3B1E54', textAlign: 'center', color: 'white' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {bookings.filter((item) => item.status === 'pending').length}
              </Typography>
              <Typography variant="body1">Previous Bookings</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 3, backgroundColor: '#257180', textAlign: 'center', color: 'white' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {bookings.filter((item) => item.status === 'pending').length}
              </Typography>
              <Typography variant="body1">New Bookings</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Booking Links */}
        <List sx={{ mt: 3 }} className='p-0'>
      {/* Confirmed Bookings */}
      <ListItem className='p-0 mb-2'>
        <Paper sx={{ width: '100%', padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ color: 'green', mr: 2 }} /> {/* Confirmed icon */}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>View My Previous Bookings</Typography>
          </div>
          <a href="/previous/bookings">
          <IconButton>
            <ChevronRight sx={{ color: '#003366' }} />
          </IconButton>
          </a>
        </Paper>
      </ListItem>

      {/* Pending Bookings */}
      <ListItem className='p-0 mb-2'>
        <Paper sx={{ width: '100%', padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Pending sx={{ color: '#FFCC00', mr: 2 }} /> {/* Pending icon */}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>View My Recent Bookings</Typography>
          </div>
         <a href="/recent/bookings">
         <IconButton>
            <ChevronRight sx={{ color: '#003366' }} />
          </IconButton>
         </a>
        </Paper>
      </ListItem>

      {/* Booking History */}
      <ListItem className='p-0 mb-2'>
        <Paper sx={{ width: '100%', padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <History sx={{ color: '#003366', mr: 2 }} /> {/* History icon */}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>View My Booking History</Typography>
          </div>
         <a href="/history">
         <IconButton>
            <ChevronRight sx={{ color: '#003366' }} />
          </IconButton>
         </a>
        </Paper>
      </ListItem>
    </List>
        </Box>
    );
}

export default Profile;
