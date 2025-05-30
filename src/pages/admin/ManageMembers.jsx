import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Modal, InputGroup, Dropdown, Pagination } from 'react-bootstrap';
import { Search, Plus, Eye, UserPlus, RefreshCw, Edit, Download, CheckSquare } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import './style.css'; // Custom CSS for additional styling

const ManageMembers = () => {
  const { setSuccess, setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // New/Edit member form state
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation: '',
    role: 'member',
    status: 'active',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/members');
      if (response.data.success) {
        setMembers(response.data.members);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setMemberForm({
      name: '',
      email: '',
      phoneNumber: '',
      designation: '',
      role: 'member',
      status: 'active',
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.email || !memberForm.phoneNumber || !memberForm.designation) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/members', memberForm);
      if (response.data.success) {
        setSuccess('Member created successfully! Credentials have been sent to the email address.');
        setMembers(prev => [...prev, response.data.member]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating member:', error);
      setError(error.response?.data?.message || 'Failed to create member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.email || !memberForm.phoneNumber || !memberForm.designation) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.put(`https://nn-z4al.onrender.com/api/members/${currentMember._id}`, memberForm);
      if (response.data.success) {
        setSuccess('Member updated successfully!');
        setMembers(prev =>
          prev.map(m => (m._id === currentMember._id ? response.data.member : m))
        );
        setShowEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating member:', error);
      setError(error.response?.data?.message || 'Failed to update member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentMember) return;

    setFormLoading(true);
    try {
      const response = await axios.post(`https://nn-z4al.onrender.com/api/members/${currentMember._id}/reset-password`);
      if (response.data.success) {
        setSuccess('Password reset successfully! New credentials have been sent to the email address.');
        setShowResetModal(false);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password');
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkResetPassword = async () => {
    if (selectedMembers.length === 0) {
      setError('No members selected');
      return;
    }

    setFormLoading(true);
    try {
      await Promise.all(
        selectedMembers.map(id =>
          axios.post(`https://nn-z4al.onrender.com/api/members/${id}/reset-password`)
        )
      );
      setSuccess('Passwords reset successfully for selected members!');
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error resetting passwords:', error);
      setError('Failed to reset passwords for some members');
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkStatusChange = async (status) => {
    if (selectedMembers.length === 0) {
      setError('No members selected');
      return;
    }

    setFormLoading(true);
    try {
      await Promise.all(
        selectedMembers.map(id =>
          axios.put(`https://nn-z4al.onrender.com/api/members/${id}`, { status })
        )
      );
      setSuccess(`Status updated to ${status} for selected members!`);
      setMembers(prev =>
        prev.map(m =>
          selectedMembers.includes(m._id) ? { ...m, status } : m
        )
      );
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status for some members');
    } finally {
      setFormLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Designation', 'Reference Code', 'Role', 'Status'];
    const rows = filteredMembers.map(m => [
      m.name,
      m.email,
      m.phoneNumber,
      m.designation,
      m.referenceCode,
      m.role,
      m.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'members_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditModal = (member) => {
    setCurrentMember(member);
    setMemberForm({
      name: member.name,
      email: member.email,
      phoneNumber: member.phoneNumber,
      designation: member.designation,
      role: member.role,
      status: member.status,
    });
    setShowEditModal(true);
  };

  const openResetModal = (member) => {
    setCurrentMember(member);
    setShowResetModal(true);
  };

  const toggleSelectMember = (id) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m._id));
    }
  };

  // Filter members
  const filteredMembers = members.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.referenceCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || member.role === filterRole;
    const matchesStatus = !filterStatus || member.status === filterStatus;
    const matchesDesignation = !filterDesignation || member.designation.toLowerCase().includes(filterDesignation.toLowerCase());
    return matchesSearch && matchesRole && matchesStatus && matchesDesignation;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="p-3 p-md-5 manage-members-container">
      {/* Top Heading */}
      <div className="mb-4">
       <div className="d-flex flex-wrap justify-content-between align-items-center">
       <h1 className="display-6 fw-bold">Manage Members</h1>

<Button className="blue-btn border-0 m-0" onClick={() => setShowAddModal(true)}>
        <UserPlus size={18} className="me-2" /> Add Member
      </Button>
       </div>
        <hr />
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Manage Members</li>
          </ol>
        </nav>
      </div>

      {/* Filters and Actions */}
      <Card className="shadow-sm mb-4 border-0 rounded-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="mb-3 mb-md-0">
              <InputGroup className='w-100'>
                <InputGroup.Text><Search size={18} /></InputGroup.Text>
                <Form.Control
                
                  placeholder="Search by name, email, or reference code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={8} className="d-flex justify-content-md-end gap-2 flex-wrap">
              <Form.Select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Roles</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Form.Select>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
              <Form.Control
                placeholder="Filter by designation"
                value={filterDesignation}
                onChange={(e) => setFilterDesignation(e.target.value)}
                style={{ maxWidth: '200px' }}
                className="me-2"
              />
              <Button variant="outline-secondary" onClick={fetchMembers}>
                <RefreshCw size={18} className="me-2" /> Refresh
              </Button>
              
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <Card className="shadow-sm mb-4 border-0 rounded-0">
          <Card.Body className="d-flex gap-2 align-items-center">
            <span>{selectedMembers.length} member(s) selected</span>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="bulk-actions">
                Bulk Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleBulkResetPassword}>
                  Reset Passwords
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleBulkStatusChange('active')}>
                  Set Active
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleBulkStatusChange('inactive')}>
                  Set Inactive
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-success" onClick={exportToCSV}>
              <Download size={18} className="me-2" /> Export Selected
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Members Table */}
      <Card className="shadow-sm border-0 rounded-0">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading members...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://png.pngtree.com/png-vector/20221008/ourmid/pngtree-prohibition-sign-transparent-png-image_6291515.png"
                alt="No members"
                className="w-25 opacity-50"
              />
              <p className="text-muted fs-5 fw-bold">No members found</p>
            </div>
          ) : (
            <>
              <Table responsive hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>
                      <Form.Check
                        checked={selectedMembers.length === filteredMembers.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Designation</th>
                    <th>Reference Code</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.map((member) => (
                    <tr key={member._id}>
                      <td>
                        <Form.Check
                          checked={selectedMembers.includes(member._id)}
                          onChange={() => toggleSelectMember(member._id)}
                        />
                      </td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phoneNumber}</td>
                      <td>{member.designation}</td>
                      <td><Badge bg="info">{member.referenceCode}</Badge></td>
                      <td><Badge bg="secondary">{member.role}</Badge></td>
                      <td>
                        <Badge bg={member.status === 'active' ? 'success' : 'warning'}>
                          {member.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => openEditModal(member)}
                            title="Edit Member"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => openResetModal(member)}
                            title="Reset Password"
                          >
                            <RefreshCw size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <div className="p-3 d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMembers.length)} of {filteredMembers.length} members
                </span>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Add Member Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Form onSubmit={handleAddSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={memberForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={memberForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={memberForm.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={memberForm.designation}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={memberForm.role}
                    onChange={handleInputChange}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={memberForm.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="alert alert-warning">
              <p className="fs-6 mb-0">
                <b>Note:</b> A temporary password will be generated and sent to the member's email.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="blue-btn border-0" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating...
                </>
              ) : (
                'Create Member'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Member Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Form onSubmit={handleEditSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={memberForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={memberForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={memberForm.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={memberForm.designation}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={memberForm.role}
                    onChange={handleInputChange}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={memberForm.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button className="blue-btn border-0" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                'Update Member'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMember && (
            <>
              <p>Are you sure you want to reset the password for:</p>
              <p>
                <strong>Name:</strong> {currentMember.name}<br />
                <strong>Email:</strong> {currentMember.email}
              </p>
              <p className="text-muted small">
                A new temporary password will be generated and sent to the member's email.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleResetPassword}
            disabled={formLoading}
          >
            {formLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageMembers;