import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MemberDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const member = state?.member || {};

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="fs-4">Member Details</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back to List
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5>Name:</h5>
              <p>{member.name || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Email:</h5>
              <p>{member.email || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Gender:</h5>
              <p>{member.gender || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Mobile Number:</h5>
              <p>{member.mobilenumber || member.personalmobilenumber || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Designation:</h5>
              <p>{member.designation || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Working Status:</h5>
              <p>{member.workingstatus || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Official Address:</h5>
              <p>{member.officialaddress || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Home Address:</h5>
              <p>{member.homeAddress || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>ID Card No:</h5>
              <p>{member.idCardNo || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Educational Qualification:</h5>
              <p>{member.educationalQualification || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Date of Birth:</h5>
              <p>{member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Aadhaar Number:</h5>
              <p>{member.aadhaarNumber || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>KGID No:</h5>
              <p>{member.kgidNo || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>PAN Number:</h5>
              <p>{member.panNumber || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Blood Group:</h5>
              <p>{member.bloodGroup || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Other Clubs Membership:</h5>
              <p>{member.otherClubsMembership || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Interests:</h5>
              <p>{member.interests || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Created At:</h5>
              <p>{new Date(member.createdAt).toLocaleString()}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5>Updated At:</h5>
              <p>{new Date(member.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;