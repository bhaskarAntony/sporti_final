import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Tabs,
  Tab,
  Table,
  Dropdown,
} from 'react-bootstrap';
import { Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { Download, Filter, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import AlertContext from '../../context/AlertContext.jsx';
import './style.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    statusCounts: [],
    typeCounts: [],
    monthlyBookings: [],
    locationCounts: [],
    guestVsSelfCounts: [],
    paymentStatusCounts: [],
    monthlyPayments: [],
    userActivity: [],
    roomPopularity: [],
    servicePopularity: [],
    totalRevenue: 0,
    averageBookingValue: 0,
    cancellationRate: 0,
  });
  const [cancellationStats, setCancellationStats] = useState({
    monthlyCancellations: [],
    typeCancellations: [],
    locationCancellations: [],
    cancellations: [],
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    bookingType: '',
    status: '',
    sporti: '',
    paymentStatus: '',
    bookingFor: '',
  });
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    fetchStats();
    fetchCancellationStats();
  }, [filters]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/bookings/stats', {
        params: filters,
      });
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchCancellationStats = async () => {
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/bookings/cancellations', {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate,
          sporti: filters.sporti,
          bookingType: filters.bookingType,
        },
      });
      if (response.data.success) {
        setCancellationStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching cancellation stats:', error);
      setError('Failed to fetch cancellation statistics');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      bookingType: '',
      status: '',
      sporti: '',
      paymentStatus: '',
      bookingFor: '',
    });
  };

  const exportToCSV = (data, filename, headers, rows) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSummaryToCSV = () => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Revenue', `₹${stats.totalRevenue.toLocaleString()}`],
      ['Total Bookings', stats.statusCounts.reduce((acc, curr) => acc + curr.count, 0)],
      ['Room Bookings', stats.typeCounts.find(t => t._id === 'room')?.count || 0],
      ['Service Bookings', stats.typeCounts.find(t => t._id === 'service')?.count || 0],
      ['Average Booking Value', `₹${stats.averageBookingValue.toLocaleString()}`],
      ['Cancellation Rate', `${(stats.cancellationRate * 100).toFixed(2)}%`],
      ['SPORTI-1 Bookings', stats.locationCounts.find(l => l._id === 'SPORTI-1')?.count || 0],
      ['SPORTI-2 Bookings', stats.locationCounts.find(l => l._id === 'SPORTI-2')?.count || 0],
      ['Guest Bookings', stats.guestVsSelfCounts.find(g => g._id === 'Guest')?.count || 0],
      ['Self Bookings', stats.guestVsSelfCounts.find(g => g._id === 'Self')?.count || 0],
      ['Paid Amount', `₹${stats.paymentStatusCounts.find(p => p._id === 'paid')?.amount.toLocaleString() || 0}`],
      ['Pending Amount', `₹${stats.paymentStatusCounts.find(p => p._id === 'pending')?.amount.toLocaleString() || 0}`],
    ];
    exportToCSV(stats, 'summary_report', headers, rows);
  };

  const exportCancellationsToCSV = () => {
    const headers = ['Booking ID', 'Type', 'Location', 'Amount (₹)', 'Date', 'Remarks', 'Payment Status'];
    const rows = cancellationStats.cancellations.map(c => [
      c._id,
      c.bookingType,
      c.sporti,
      c.totalCost.toLocaleString(),
      new Date(c.createdAt).toLocaleDateString(),
      c.remarks || 'N/A',
      c.paymentStatus,
    ]);
    exportToCSV(cancellationStats, 'cancellations_report', headers, rows);
  };

  const exportUsersToCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Bookings', 'Revenue (₹)'];
    const rows = stats.userActivity.map(u => [
      u.userId,
      u.userName,
      u.userEmail,
      u.count,
      u.revenue.toLocaleString(),
    ]);
    exportToCSV(stats.userActivity, 'users_report', headers, rows);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reports & Analytics', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    let y = 50;
    doc.text('Summary Metrics', 20, y);
    y += 10;
    doc.text(`Total Revenue: ₹${stats.totalRevenue.toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Total Bookings: ${stats.statusCounts.reduce((acc, curr) => acc + curr.count, 0)}`, 20, y);
    y += 10;
    doc.text(`Room Bookings: ${stats.typeCounts.find(t => t._id === 'room')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`Service Bookings: ${stats.typeCounts.find(t => t._id === 'service')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`Average Booking Value: ₹${stats.averageBookingValue.toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Cancellation Rate: ${(stats.cancellationRate * 100).toFixed(2)}%`, 20, y);
    y += 10;
    doc.text(`SPORTI-1 Bookings: ${stats.locationCounts.find(l => l._id === 'SPORTI-1')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`SPORTI-2 Bookings: ${stats.locationCounts.find(l => l._id === 'SPORTI-2')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`Guest Bookings: ${stats.guestVsSelfCounts.find(g => g._id === 'Guest')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`Self Bookings: ${stats.guestVsSelfCounts.find(g => g._id === 'Self')?.count || 0}`, 20, y);
    y += 10;
    doc.text(`Paid Amount: ₹${stats.paymentStatusCounts.find(p => p._id === 'paid')?.amount.toLocaleString() || 0}`, 20, y);
    y += 10;
    doc.text(`Pending Amount: ₹${stats.paymentStatusCounts.find(p => p._id === 'pending')?.amount.toLocaleString() || 0}`, 20, y);

    doc.save('reports.pdf');
  };

  const getTypeChartData = () => ({
    labels: stats.typeCounts.map(item => item._id === 'room' ? 'Room Bookings' : 'Service Bookings'),
    datasets: [
      {
        data: stats.typeCounts.map(item => item.count),
        backgroundColor: ['#0056b3', '#28a745'],
      },
    ],
  });

  const getCancellationRateChartData = () => ({
    labels: ['Cancelled', 'Other'],
    datasets: [
      {
        data: [
          stats.cancellationRate * 100,
          100 - stats.cancellationRate * 100,
        ],
        backgroundColor: ['#F44336', '#E0E0E0'],
      },
    ],
  });

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading statistics...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 reports-container">
      <div className="mb-4">
        <h1 className="display-6 fw-bold">Reports & Analytics</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Reports</li>
          </ol>
        </nav>
      </div>

      <Card className="shadow-sm mb-4 border-0 rounded-0">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={8} className="mb-3 mb-md-0">
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Booking Type</Form.Label>
                    <Form.Select
                      name="bookingType"
                      value={filters.bookingType}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      <option value="room">Room</option>
                      <option value="service">Service</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3} className="mt-3">
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      name="sporti"
                      value={filters.sporti}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Locations</option>
                      <option value="SPORTI-1">SPORTI-1</option>
                      <option value="SPORTI-2">SPORTI-2</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3} className="mt-3">
                  <Form.Group>
                    <Form.Label>Payment Status</Form.Label>
                    <Form.Select
                      name="paymentStatus"
                      value={filters.paymentStatus}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Payments</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3} className="mt-3">
                  <Form.Group>
                    <Form.Label>Booking For</Form.Label>
                    <Form.Select
                      name="bookingFor"
                      value={filters.bookingFor}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      <option value="Self">Self</option>
                      <option value="Guest">Guest</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="d-flex justify-content-md-end gap-2">
              <Button variant="outline-secondary" onClick={resetFilters}>
                <RefreshCw size={18} className="me-2" /> Reset Filters
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="export-options">
                  <Download size={18} className="me-2" /> Export
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={exportSummaryToCSV}>Export Summary (CSV)</Dropdown.Item>
                  <Dropdown.Item onClick={exportCancellationsToCSV}>Export Cancellations (CSV)</Dropdown.Item>
                  <Dropdown.Item onClick={exportUsersToCSV}>Export Users (CSV)</Dropdown.Item>
                  <Dropdown.Item onClick={exportToPDF}>Export Summary (PDF)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        id="reports-tabs"
        className="mb-4"
      >
        <Tab eventKey="summary" title="Summary">
          <Row className="mb-4">
            {[
              { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}` },
              { title: 'Total Bookings', value: stats.statusCounts.reduce((acc, curr) => acc + curr.count, 0) },
              { title: 'Room Bookings', value: stats.typeCounts.find(t => t._id === 'room')?.count || 0 },
              { title: 'Service Bookings', value: stats.typeCounts.find(t => t._id === 'service')?.count || 0 },
              { title: 'Avg. Booking Value', value: `₹${stats.averageBookingValue.toLocaleString()}` },
              { title: 'Cancellation Rate', value: `${(stats.cancellationRate * 100).toFixed(2)}%` },
            ].map((item, index) => (
              <Col lg={2} sm={6} className="mb-4" key={index}>
                <Card className="shadow-sm h-100 border-0 rounded-0">
                  <Card.Body>
                    <h6 className="text-muted mb-2">{item.title}</h6>
                    <h3 className="mb-0">{item.value}</h3>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mb-4">
            <Col lg={6}>
              <Card className="shadow-sm border-0 rounded-0">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Booking Type Distribution</h5>
                </Card.Header>
                <Card.Body>
                  <Pie
                    data={getTypeChartData()}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'bottom' } },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="shadow-sm border-0 rounded-0">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Cancellation Rate</h5>
                </Card.Header>
                <Card.Body>
                  {stats.cancellationRate !== undefined ? (
                    <Doughnut
                      data={getCancellationRateChartData()}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'bottom' },
                          tooltip: {
                            callbacks: {
                              label: context => `${context.label}: ${context.raw.toFixed(2)}%`,
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <p className="text-muted">No cancellation data available</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Summary Table</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Revenue</td>
                    <td>₹{stats.totalRevenue.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Total Bookings</td>
                    <td>{stats.statusCounts.reduce((acc, curr) => acc + curr.count, 0)}</td>
                  </tr>
                  <tr>
                    <td>Room Bookings</td>
                    <td>{stats.typeCounts.find(t => t._id === 'room')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>Service Bookings</td>
                    <td>{stats.typeCounts.find(t => t._id === 'service')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>Average Booking Value</td>
                    <td>₹{stats.averageBookingValue.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Cancellation Rate</td>
                    <td>{(stats.cancellationRate * 100).toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td>SPORTI-1 Bookings</td>
                    <td>{stats.locationCounts.find(l => l._id === 'SPORTI-1')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>SPORTI-2 Bookings</td>
                    <td>{stats.locationCounts.find(l => l._id === 'SPORTI-2')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>Guest Bookings</td>
                    <td>{stats.guestVsSelfCounts.find(g => g._id === 'Guest')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>Self Bookings</td>
                    <td>{stats.guestVsSelfCounts.find(g => g._id === 'Self')?.count || 0}</td>
                  </tr>
                  <tr>
                    <td>Paid Amount</td>
                    <td>₹{stats.paymentStatusCounts.find(p => p._id === 'paid')?.amount.toLocaleString() || 0}</td>
                  </tr>
                  <tr>
                    <td>Pending Amount</td>
                    <td>₹{stats.paymentStatusCounts.find(p => p._id === 'pending')?.amount.toLocaleString() || 0}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Booking Statistics</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Status Breakdown</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Revenue (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.statusCounts.map(s => (
                        <tr key={s._id}>
                          <td>{s._id}</td>
                          <td>{s.count}</td>
                          <td>{s.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Location Breakdown</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>Count</th>
                        <th>Revenue (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.locationCounts.map(l => (
                        <tr key={l._id}>
                          <td>{l._id}</td>
                          <td>{l.count}</td>
                          <td>{l.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <h6>Monthly Bookings</h6>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Count</th>
                    <th>Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.monthlyBookings.map(m => (
                    <tr key={`${m._id.month}-${m._id.year}`}>
                      <td>{`${m._id.month}/${m._id.year}`}</td>
                      <td>{m.count}</td>
                      <td>{m.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="payments" title="Payments">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Payment Statistics</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Payment Status Breakdown</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.paymentStatusCounts.map(p => (
                        <tr key={p._id}>
                          <td>{p._id}</td>
                          <td>{p.count}</td>
                          <td>{p.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Monthly Payments</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.monthlyPayments.map(m => (
                        <tr key={`${m._id.month}-${m._id.year}-${m._id.paymentStatus}`}>
                          <td>{`${m._id.month}/${m._id.year}`}</td>
                          <td>{m._id.paymentStatus}</td>
                          <td>{m.count}</td>
                          <td>{m.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="cancellations" title="Cancellations">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Cancellation Statistics</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Type Breakdown</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Revenue Lost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancellationStats.typeCancellations.map(t => (
                        <tr key={t._id}>
                          <td>{t._id}</td>
                          <td>{t.count}</td>
                          <td>{t.revenueLost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Location Breakdown</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>Count</th>
                        <th>Revenue Lost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancellationStats.locationCancellations.map(l => (
                        <tr key={l._id}>
                          <td>{l._id}</td>
                          <td>{l.count}</td>
                          <td>{l.revenueLost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <h6>Detailed Cancellations</h6>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Amount (₹)</th>
                    <th>Date</th>
                    <th>Remarks</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cancellationStats.cancellations.map(c => (
                    <tr key={c._id}>
                      <td>{c._id}</td>
                      <td>{c.bookingType}</td>
                      <td>{c.sporti}</td>
                      <td>{c.totalCost.toLocaleString()}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>{c.remarks || 'N/A'}</td>
                      <td>{c.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="users" title="Users">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">User Activity</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Bookings</th>
                    <th>Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.userActivity.map(u => (
                    <tr key={u.userId}>
                      <td>{u.userId}</td>
                      <td>{u.userName}</td>
                      <td>{u.userEmail}</td>
                      <td>{u.count}</td>
                      <td>{u.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="rooms-services" title="Rooms & Services">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Room & Service Popularity</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Room Popularity</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Room ID</th>
                        <th>Name</th>
                        <th>Bookings</th>
                        <th>Revenue (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.roomPopularity.map(r => (
                        <tr key={r.roomId}>
                          <td>{r.roomId}</td>
                          <td>{r.roomName}</td>
                          <td>{r.count}</td>
                          <td>{r.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Service Popularity</h6>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Service ID</th>
                        <th>Name</th>
                        <th>Bookings</th>
                        <th>Revenue (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.servicePopularity.map(s => (
                        <tr key={s.serviceId}>
                          <td>{s.serviceId}</td>
                          <td>{s.serviceName}</td>
                          <td>{s.count}</td>
                          <td>{s.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {stats.statusCounts.length === 0 && stats.typeCounts.length === 0 && stats.monthlyBookings.length === 0 && (
        <Card className="shadow-sm border-0 rounded-0 text-center py-5">
          <img
            src="https://png.pngtree.com/png-vector/20221008/ourmid/pngtree-prohibition-sign-transparent-png-image_6291515.png"
            alt="No data"
            className="w-25 opacity-50"
          />
          <p className="text-muted fs-5 fw-bold">No data available for the selected filters</p>
        </Card>
      )}
    </Container>
  );
};

export default Reports;