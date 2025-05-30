import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Filter } from 'lucide-react';

const BookingFilters = ({ filters, onFilterChange, onResetFilters, isNonMember = false }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white">
        <h5 className="mb-0">
          <Filter size={18} className="me-2" />
          Filter Bookings
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={filters.status} onChange={onFilterChange}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label>Booking Type</Form.Label>
              <Form.Select
                name="bookingType"
                value={filters.bookingType}
                onChange={onFilterChange}
                disabled={isNonMember}
              >
                <option value="room">Room</option>
                {!isNonMember && <option value="service">Service</option>}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={onFilterChange}
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
                onChange={onFilterChange}
                min={filters.startDate}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-secondary" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookingFilters;