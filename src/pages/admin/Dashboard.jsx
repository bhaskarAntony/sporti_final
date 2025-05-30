import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner, Badge, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AlertCircle, Users, FileText, DollarSign, Calendar, Home, BookOpen, ArrowRight } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import AdminSidebar from './AdminSidebar.jsx';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const AdminDashboard = () => {
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [stats, setStats] = useState({
    members: 0,
    bookings: 0,
    revenue: 0,
    pendingCount: 0,
    statusCounts: [],
    typeCounts: [],
    monthlyBookings: []
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        setStatsLoading(true);
        const statsResponse = await axios.get('https://nn-z4al.onrender.com/api/bookings/stats');
        
        // Fetch members count
        const membersResponse = await axios.get('https://nn-z4al.onrender.com/api/members');
        
        // Fetch pending approvals
        const approvalsResponse = await axios.get('https://nn-z4al.onrender.com/api/bookings', {
          params: { status: 'pending' }
        });
        
        if (statsResponse.data.success && membersResponse.data.success && approvalsResponse.data.success) {
          // Set stats
          setStats({
            members: membersResponse.data.count,
            bookings: statsResponse.data.stats.statusCounts.reduce((acc, curr) => acc + curr.count, 0),
            revenue: statsResponse.data.stats.totalRevenue,
            pendingCount: statsResponse.data.stats.statusCounts.find(s => s._id === 'pending')?.count || 0,
            statusCounts: statsResponse.data.stats.statusCounts,
            typeCounts: statsResponse.data.stats.typeCounts,
            monthlyBookings: statsResponse.data.stats.monthlyBookings
          });
          
          // Set pending approvals
          setPendingApprovals(approvalsResponse.data.bookings);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [setError]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Prepare chart data
  const getStatusChartData = () => {
    const labels = stats.statusCounts.map(item => item._id);
    const data = stats.statusCounts.map(item => item.count);
    const backgroundColors = [
      '#4CAF50', // confirmed
      '#FFC107', // pending
      '#F44336', // rejected
      '#9E9E9E', // cancelled
      '#2196F3'  // completed
    ];
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }
      ]
    };
  };
  
  const getTypeChartData = () => {
    const labels = stats.typeCounts.map(item => item._id === 'room' ? 'Room Bookings' : 'Service Bookings');
    const data = stats.typeCounts.map(item => item.count);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#0056b3', '#28a745'],
          borderWidth: 1
        }
      ]
    };
  };
  
  const getMonthlyBookingsData = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sortedData = [...stats.monthlyBookings].sort((a, b) => {
      if (a._id.year !== b._id.year) return a._id.year - b._id.year;
      return a._id.month - b._id.month;
    });
    
    const labels = sortedData.map(item => `${monthNames[item._id.month - 1]} ${item._id.year}`);
    const bookingCounts = sortedData.map(item => item.count);
    const revenueCounts = sortedData.map(item => item.revenue / 1000); // Convert to thousands
    
    return {
      labels,
      datasets: [
        {
          label: 'Bookings',
          data: bookingCounts,
          backgroundColor: 'rgba(0, 86, 179, 0.4)',
          borderColor: 'rgba(0, 86, 179, 1)',
          borderWidth: 2,
          yAxisID: 'y'
        },
        {
          label: 'Revenue (₹ thousands)',
          data: revenueCounts,
          backgroundColor: 'rgba(40, 167, 69, 0.4)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 2,
          yAxisID: 'y1'
        }
      ]
    };
  };
  
  return (
    <div className="container-fluid p-0" style={{height:'100vh', overflow:'hidden'}}>
      <div className="row">
        <div className="col-md-2" >
        <AdminSidebar/>
        </div>
        <div className="col-md-10" style={{height:'100vh', overflow:'auto'}}>
        <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <div>
          <Link to="/admin/members">
            <Button variant="outline-primary" className="me-2">
              <Users size={18} className="me-2" />
              Manage Members
            </Button>
          </Link>
          <Link to="/admin/bookings">
            <Button variant="primary">
              <Calendar size={18} className="me-2" />
              Manage Bookings
            </Button>
          </Link>
        </div>
      </div>
      
      <Row className="mb-4">
        <Col xl={3} md={6} className="mb-4">
          <Card className="h-100 stats-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <Users size={30} color="#0056b3" />
              </div>
              <div>
                {statsLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <h3 className="mb-0">{stats.members}</h3>
                    <p className="text-muted mb-0">Total Members</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6} className="mb-4">
          <Card className="h-100 stats-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <Calendar size={30} color="#28a745" />
              </div>
              <div>
                {statsLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <h3 className="mb-0">{stats.bookings}</h3>
                    <p className="text-muted mb-0">Total Bookings</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6} className="mb-4">
          <Card className="h-100 stats-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <AlertCircle size={30} color="#ffc107" />
              </div>
              <div>
                {statsLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <h3 className="mb-0">{stats.pendingCount}</h3>
                    <p className="text-muted mb-0">Pending Approvals</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} md={6} className="mb-4">
          <Card className="h-100 stats-card">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <DollarSign size={30} color="#17a2b8" />
              </div>
              <div>
                {statsLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <h3 className="mb-0">₹{stats.revenue.toLocaleString()}</h3>
                    <p className="text-muted mb-0">Total Revenue</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col xl={8} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Booking & Revenue Trends</h5>
            </Card.Header>
            <Card.Body>
              {statsLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : stats.monthlyBookings.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No booking data available</p>
                </div>
              ) : (
                <Line 
                  data={getMonthlyBookingsData()} 
                  options={{
                    responsive: true,
                    interaction: {
                      mode: 'index',
                      intersect: false,
                    },
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                          display: true,
                          text: 'Bookings'
                        }
                      },
                      y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                          drawOnChartArea: false,
                        },
                        title: {
                          display: true,
                          text: 'Revenue (₹ thousands)'
                        }
                      },
                    }
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={4}>
          <Row>
            <Col sm={6} xl={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Booking Status</h5>
                </Card.Header>
                <Card.Body>
                  {statsLoading ? (
                    <div className="text-center py-4">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : stats.statusCounts.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No data available</p>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div style={{ maxHeight: '200px', maxWidth: '200px' }}>
                        <Doughnut data={getStatusChartData()} options={{ responsive: true, maintainAspectRatio: true }} />
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col sm={6} xl={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Booking Types</h5>
                </Card.Header>
                <Card.Body>
                  {statsLoading ? (
                    <div className="text-center py-4">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : stats.typeCounts.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No data available</p>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div style={{ maxHeight: '200px', maxWidth: '200px' }}>
                        <Doughnut data={getTypeChartData()} options={{ responsive: true, maintainAspectRatio: true }} />
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Row>
        <Col className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Pending Approvals</h5>
                <Link to="/admin/bookings" className="text-decoration-none small">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : pendingApprovals.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No pending approvals</p>
                </div>
              ) : (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Type</th>
                      <th>Member</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.bookingId}</td>
                        <td>
                          <Badge bg={booking.bookingType === 'room' ? 'info' : 'success'}>
                            {booking.bookingType}
                          </Badge>
                          {booking.bookingFor === 'Guest' && (
                            <Badge bg="warning" className="ms-1">Guest</Badge>
                          )}
                        </td>
                        <td>{booking.userId?.name}</td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>{formatDate(booking.checkOut)}</td>
                        <td>₹{booking.totalCost.toLocaleString()}</td>
                        <td>
                          <Link to={`/booking/${booking._id}`}>
                            <Button variant="outline-primary" size="sm">
                              Review
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;