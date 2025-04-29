import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigate = useNavigate();

  // Fetch member data on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/members/list');
        setData(response.data);
        setFilteredData(response.data); // Initially, filteredData is the same as data
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  // CSV headers for exporting member data
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Gender', key: 'gender' },
    { label: 'Designation', key: 'designation' },
    { label: 'Working Status', key: 'workingstatus' },
    { label: 'Official Address', key: 'officialaddress' },
    { label: 'ID Card No', key: 'idCardNo' }
  ];

  // Handle checkbox change for selecting members
  const handleCheckboxChange = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete multiple selected members
  const deleteMultipleMembers = async () => {
    try {
      await Promise.all(
        selectedMembers.map((id) =>
          axios.delete(`http://localhost:4000/api/auth/members/${id}`)
        )
      );
      setData(data.filter((item) => !selectedMembers.includes(item._id)));
      setFilteredData(filteredData.filter((item) => !selectedMembers.includes(item._id)));
      setSelectedMembers([]);
      alert('Selected members deleted successfully!');
    } catch (error) {
      console.error('Error deleting members:', error);
      alert('Failed to delete members.');
    }
  };

  // Delete a single member
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/members/${id}`);
      setData(data.filter((item) => item._id !== id));
      setFilteredData(filteredData.filter((item) => item._id !== id));
      setSelectedMembers(selectedMembers.filter((item) => item !== id));
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member.');
    }
  };

  // Navigate to member details page
  const gotoViewDetails = (item) => {
    navigate('/member-details', { state: { member: item } });
  };

  return (
    <div className="col-md-12">
      <div className="all-members p-3 p-md-5 bg-white mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fs-5">All Members</h1>
            <p className="fs-6 text-secondary">Here you can find all registered members</p>
          </div>
          <CSVLink
            data={filteredData}
            headers={headers}
            filename={`member_data_${selectedMonth ? selectedMonth.label : 'all'}.csv`}
            className="main-btn"
          >
            <i className="bi bi-download"></i> Download Data
          </CSVLink>
        </div>
        <>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger mb-3"
              onClick={deleteMultipleMembers}
              disabled={selectedMembers.length === 0}
            >
              Delete Selected
            </button>
          </div>

          {data.length !== 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className='text-white'>Select</th>
                    {/* <th>Profile</th> */}
                    <th  className='text-white'>Name</th>
                    <th  className='text-white'>Designation</th>
                    <th  className='text-white'>Working Status</th>
                    <th  className='text-white'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                      </td>
                      {/* <td>
                        <img
                          src="https://www.uniquemedical.com.au/wp-content/uploads/2024/03/Default_pfp.svg.png"
                          alt=""
                        />
                      </td> */}
                      <td>{item.name}</td>
                      <td>{item.designation || 'N/A'}</td>
                      <td>{item.workingstatus || 'N/A'}</td>
                      <td className="">
                        <div className="d-flex gap-3 flex-wrap h-100">
                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => gotoViewDetails(item)}
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteHandler(item._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="col-md-3 m-auto">
              <img
                src="https://img.freepik.com/premium-vector/access-documents-that-are-cloud-storage-is-closed-data-protection-flat-vector-illustration_124715-1657.jpg?w=740"
                className="w-100"
                alt=""
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default MemberList;