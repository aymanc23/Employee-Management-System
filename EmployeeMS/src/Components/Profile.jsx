import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminRecords();
    }, []);

    const fetchAdminRecords = () => {
        axios.get('http://localhost:4000/auth/admin_records')
            .then(result => {
                if (result.data.Status) {
                    setAdmins(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    };

    const handleLogout = () => {
        axios.get('http://localhost:4000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem('valid');
                    navigate('/');
                } else {
                    alert('Logout failed. Please try again.');
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="admin-list-container">
            {/* Header */}
            <div className="header mt-4 px-5 pt-3 text-center">
                <h2 className="fw-bold text-primary">Admin Profile</h2>
                <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
            </div>

            {/* List of Admins */}
            <div className="admin-table-wrapper mt-4 px-5 py-3 shadow-lg rounded">
                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{admin.email}</td>
                                <td>
                                    <span className="text-muted">{admin.password}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;

