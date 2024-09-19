// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      

        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/get-user-data');
            setUsers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleVerifyMembership = async (userId) => {
        try {
            await axios.put('http://localhost:5000/api/admin/verify-membership', { userId, isMembershipVerified: true });
            // Refresh user data after verification
            fetchUsers();
            
        } catch (error) {
            console.error('Error verifying membership:', error);
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Membership Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isMembershipVerified ? 'Verified' : 'Not Verified'}</td>
                            <td>
                                {!user.isMembershipVerified && (
                                    <button onClick={() => handleVerifyMembership(user._id)}>Verify</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
