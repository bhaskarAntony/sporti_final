import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/popup/Loading';
import { toast } from 'react-toastify';
import './style.css'

function CreateMember() {
  const [userData, setUserData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    designation: '',
    workingStatus: '',
    educationalQualification: '',
    homeAddress: '',
    officeAddress: '',
    personalMobileNumber: '',
    // email: '',
    dateOfBirth: '',
    gender: '',
    aadhaarNumber: '',
    kgidNo: '',
    panNumber: '',
    bloodGroup: '',
    otherClubsMembership: '',
    interests: [],
    idCardNo: '',
    email:'',
    password:''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData?.interests, value]
          : prevData.interests.filter((interest) => interest !== value),
      }));
    } else {
      setUserData((prevData) =>(
        { ...prevData, [name]: value }
      )); // Error: 'prevData' is not defined
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Validate required fields
    if (!userData.firstName || !userData.email || !userData.personalMobileNumber) {
      toast.error('First Name, Email, and Personal Mobile Number are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(//https://sporti-backend-live-p00l.onrender.com
        'http://localhost:4000/api/auth/register',
        {
          name: `${userData.firstName} ${userData.middleName} ${userData.lastName}`.trim(),
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          mobilenumber: userData.personalMobileNumber,
          designation: userData.designation,
          workingstatus: userData.workingStatus,
          officialaddress: userData.officeAddress,
          personalmobilenumber: userData.personalMobileNumber,
          idCardNo: userData.idCardNo,
          educationalQualification: userData.educationalQualification,
          homeAddress: userData.homeAddress,
          dateOfBirth: userData.dateOfBirth,
          aadhaarNumber: userData.aadhaarNumber,
          kgidNo: userData.kgidNo,
          panNumber: userData.panNumber,
          bloodGroup: userData.bloodGroup,
          otherClubsMembership: userData.otherClubsMembership,
          interests: userData.interests.join(', '),
          firstName:userData.firstName,
          firstName:userData.lastName,
          firstName:userData.middleName,
        }
      );
      console.log(response);
      setLoading(false);
      toast.success('Member created successfully!');
      navigate('/admin');
    } catch (error) {
      setLoading(false);
      toast.error('Error creating member. Please check and try again later.');
      console.error('Error creating member:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container fluid className="bg-light p-3 p-md-5">
      <Row className="justify-content-center">
        <Col md={11} lg={11}>
          <div className="shadow-sm bg-white" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            {/* Header */}
            <Card.Header className="bg-primary text-white text-center py-4">
              <h4 className="mb-0">Create New Member</h4>
              <small>Senior Police Officers' Research and Training Institute</small>
            </Card.Header>

            <Card.Body className="p-4">
              <Form>
                {/* Name Fields */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="middleName">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="middleName"
                        value={userData.middleName}
                        onChange={handleChange}
                        placeholder="Enter Middle Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Designation */}
                <Form.Group controlId="designation" className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={userData.designation}
                    onChange={handleChange}
                    placeholder="Enter Designation"
                  />
                </Form.Group>

                {/* Working Status */}
                <Form.Group controlId="workingStatus" className="mb-3">
                  <Form.Label>Working Status</Form.Label>
                  <Form.Select name="workingStatus" value={userData.workingStatus} onChange={handleChange}>
                    <option value="">Select Working Status</option>
                    <option value="Retired">Retired</option>
                    <option value="Serving">Serving</option>
                  </Form.Select>
                </Form.Group>

                {/* Educational Qualification */}
                <Form.Group controlId="educationalQualification" className="mb-3">
                  <Form.Label>Educational Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    name="educationalQualification"
                    value={userData.educationalQualification}
                    onChange={handleChange}
                    placeholder="Enter Educational Qualification"
                  />
                </Form.Group>

                {/* Addresses */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="homeAddress">
                      <Form.Label>Home Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="homeAddress"
                        value={userData.homeAddress}
                        onChange={handleChange}
                        placeholder="Enter Home Address"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="officeAddress">
                      <Form.Label>Office Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="officeAddress"
                        value={userData.officeAddress}
                        onChange={handleChange}
                        placeholder="Enter Office Address"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Information */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="personalMobileNumber">
                      <Form.Label>Personal Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="personalMobileNumber"
                        value={userData.personalMobileNumber}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Enter Email ID"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Date of Birth and Gender */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="dateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label="Male"
                          name="gender"
                          type="radio"
                          value="Male"
                          checked={userData.gender === 'Male'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          label="Female"
                          name="gender"
                          type="radio"
                          value="Female"
                          checked={userData.gender === 'Female'}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Identification Numbers */}
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="aadhaarNumber">
                      <Form.Label>Aadhaar Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="aadhaarNumber"
                        value={userData.aadhaarNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhaar Number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="kgidNo">
                      <Form.Label>KGID No</Form.Label>
                      <Form.Control
                        type="text"
                        name="kgidNo"
                        value={userData.kgidNo}
                        onChange={handleChange}
                        placeholder="Enter KGID Number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="panNumber">
                      <Form.Label>PAN Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="panNumber"
                        value={userData.panNumber}
                        onChange={handleChange}
                        placeholder="Enter PAN Number"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Blood Group and Other Clubs */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="bloodGroup">
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Control
                        type="text"
                        name="bloodGroup"
                        value={userData.bloodGroup}
                        onChange={handleChange}
                        placeholder="Enter Blood Group (e.g., A+)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="otherClubsMembership">
                      <Form.Label>Other Clubs Membership Held</Form.Label>
                      <Form.Control
                        type="text"
                        name="otherClubsMembership"
                        value={userData.otherClubsMembership}
                        onChange={handleChange}
                        placeholder="Enter Other Clubs Membership"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Interests */}
                <Form.Group controlId="interests" className="mb-3">
                  <Form.Label>Interests</Form.Label>
                  <div>
                    {['Reading', 'Sports', 'Movies', 'Music', 'Adventure', 'Others'].map((interest) => (
                      <Form.Check
                        key={interest}
                        inline
                        label={interest}
                        name="interests"
                        type="checkbox"
                        value={interest}
                        checked={userData.interests.includes(interest)}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                {/* ID Card Number */}
                <Form.Group controlId="idCardNo" className="mb-3">
                  <Form.Label>ID Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="idCardNo"
                    value={userData.idCardNo}
                    onChange={handleChange}
                    placeholder="Enter ID Card Number"
                  />
                </Form.Group>

                {/* Terms and Conditions */}
                <h5 className="text-danger mt-4 mb-3">Terms & Conditions</h5>
                <ListGroup as="ol" numbered className="mb-4">
                  <ListGroup.Item>
                    Provide Official ID Card copy and 02 Passport photos of applicant.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Provide a valid Govt. ID Card (Aadhaar / Voter ID) and 02 Passport photos of the dependents.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Dependents are children of members who are not more than 21 years of age.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Lifetime Membership fee is Rs. 10,000/- (including GST) and is non-refundable. Membership is non-transferable.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Retired officials are considered as Associate members.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    All members and their guests are eligible to use all the facilities on subscription basis.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Guests should always be accompanied by either members or their dependents for using the dining facility.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    SPORTI Executive Committee has all rights to cancel the membership.
                  </ListGroup.Item>
                </ListGroup>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="w-100 py-2"
                  style={{ borderRadius: '20px', fontWeight: 'bold' }}
                >
                  Create Member
                </Button>
              </Form>
            </Card.Body>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateMember;