import React, { useState, useContext, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Image } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Briefcase, Key, Award } from 'lucide-react';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';
import './Profile.css';

const UserProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const { setSuccess, setError } = useContext(AlertContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    phone: user?.phoneNumber || '',
    designation: user?.designation || '',
    address: user?.address || '',
    department: user?.department || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullName', profileData.fullName);
      formData.append('phone', profileData.phone);
      formData.append('designation', profileData.designation);
      formData.append('address', profileData.address);
      formData.append('department', profileData.department);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const result = await updateProfile(formData);

      if (result.success) {
        setSuccess('Profile updated successfully');
        setProfileImage(null);
        setImagePreview(null);
        fileInputRef.current.value = null;
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile({
        currentPassword: profileData.currentPassword,
        newPassword: profileData.newPassword
      });

      if (result.success) {
        setSuccess('Password updated successfully');
        setShowPasswordModal(false);
        setProfileData({
          ...profileData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="p-3 p-md-5 bg-light">
      <Row className="">
      <Col md={4} className='p-2 mb-2'>
      <div className="card p-3 border-0 rounded-0">
                 <div className="text-center mb-4">
                    <div className="user-profile-img-wrapper mx-auto">
                      {imagePreview || user?.profilePic ? (
                        <Image
                          src={'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' || user?.profilePic}
                          alt="Profile"
                          className="user-profile-img"
                        />
                      ) : (
                        <div className="user-profile-img-placeholder">
                         <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" alt="" width={100} height={100} className='rounded-circle border border-3 p-2'/>
                        </div>
                      )}
                      {/* <Button
                        variant="link"
                        className="user-profile-img-edit"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button> */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                    <h4 className="mt-3 fw-bold">{(user?.name).toUpperCase()}</h4>
                    <p className="text-muted mb-0">{user?.designation}</p>
                  </div>
                  <div className="user-profile-info">
                    <div className="d-flex align-items-center mb-3">
                      <Mail size={20} className="me-2" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <Phone size={20} className="me-2" />
                      <span>{user?.phoneNumber}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <MapPin size={20} className="me-2" />
                      <span>{user?.address || 'Not provided'}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <Briefcase size={20} className="me-2" />
                      <span>{user?.department || 'Not provided'}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Award size={20} className="me-2" />
                      <span>Ref: {user?.referenceCode}</span>
                    </div>
                    <button className="blue-btn w-100 mt-3 rounded-1" onClick={() => setShowPasswordModal(true)}>Change Password</button>
                  </div>
                 </div>
                </Col>
                <Col md={8} className='p-2 mb-2'>
                <div className="card p-3 p-md-5 w-100 border-0 rounded-0">
                 <h3 className="fw-bold mb-4 text-dark fs-4">Profile Settings</h3>
                 <hr />
                  <Form onSubmit={handleProfileSubmit}>
                    <Row>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label className="fw-medium">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            required
                            className="user-profile-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label className="fw-medium">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            required
                            className="user-profile-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label className="fw-medium">Designation</Form.Label>
                          <Form.Control
                            type="text"
                            name="designation"
                            value={profileData.designation}
                            onChange={handleInputChange}
                            required
                            className="user-profile-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-4">
                        <Form.Group>
                          <Form.Label className="fw-medium">Department</Form.Label>
                          <Form.Control
                            type="text"
                            name="department"
                            value={profileData.department}
                            onChange={handleInputChange}
                            className="user-profile-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="user-profile-input"
                      />
                    </Form.Group>
                    <Button
                      // variant='blue-btn'
                      type="submit"
                      disabled={isLoading}
                      className="blue-btn mt-3 border-0"
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Form>
                  <div className="mt-4">
                    <Button
                      variant="link"
                      className="user-profile-password-btn"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <Key size={20} className="me-2" />
                      Change Password
                    </Button>
                  </div>
                 </div>
                </Col>
      </Row>

      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        className="p-0"
      >
        <Modal.Header closeButton className='p-0 mb-2'>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="p-2">
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={profileData.currentPassword}
                onChange={handleInputChange}
                required
                className="user-profile-input"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={profileData.newPassword}
                onChange={handleInputChange}
                required
                className="user-profile-input"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
                required
                className="user-profile-input"
              />
            </Form.Group>
            {profileData.newPassword !== profileData.confirmPassword && (
              <div className="alert alert-danger" role="alert">
                Passwords do not match
              </div>
            )}
            <div className="d-flex gap-3 justify-content-end">
              <Button
                // variant='blue-btn'
                type="submit"
                disabled={isLoading || profileData.newPassword !== profileData.confirmPassword}
                className="blue-btn m-0 border-0"
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowPasswordModal(false)}
                className="user-profile-btn-outline"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserProfile;