import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, IconButton, CircularProgress } from '@mui/material';
import { ChevronRight, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {user} = useAuth();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://sporti-backend-live-p00l.onrender.com/api/sporti/service/bookings');
      setBookings(response.data.filter((item) => (item.email).toLowerCase() === user.email));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching bookings</Typography>;

  const goTodetails = (formData) =>{
    navigate('/view/details', { state: {data:formData } });
  }

  return (
    <Box className="p-3 p-md-5 bg-light" sx={{ maxWidth: '100%' }}>
    
      {
    bookings.length == 0?(
        <div className="row">
            <div className="col-md-4 m-auto">
                <div className="card w-100 p-3 text-center">
                    <img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif" alt="" className="w-100" />
                    <h1 className="fs-5 fw-bold">No Booking History found</h1>
                </div>
            </div>
        </div>
    ):(
       <>
        <Typography variant="h4" mb={3}>Booking History</Typography>
        <Grid container spacing={3}>
        {bookings.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{item.serviceName}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{item.roomType}</Typography>
                <Typography variant="body2">
                  Status: <span className="alert alert-warning p-1 px-3">{item.status}</span>
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <a href={`/edit/booking/${item.applicationNo}`}>
                  {/* <IconButton>
                    <Edit sx={{ color: 'green' }} />
                  </IconButton> */}
                  </a>
                  <IconButton onClick={()=>goTodetails(item)}>
                    <ChevronRight sx={{ color: '#003366' }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       </>
    )
   }
    </Box>
  );
}

export default BookingHistory;
