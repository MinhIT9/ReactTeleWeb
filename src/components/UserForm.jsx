// src/components/UserForm.jsx
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ user = {}, onSave, onClose }) => {

    // Khởi tạo state với giá trị mặc định từ prop 'user'
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '', // Đặt giá trị mặc định là mật khẩu hiện tại, hoặc để trống
        status: user?.status || '',
        role: user?.role || '',
    });

    // Xử lý thay đổi trong form inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            status: formData.status || 'Inactive',
            role: formData.role || 'User',
        };
        onSave(dataToSave);
    };

    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{user && user.id ? 'Edit User' : 'Add New User'}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>

                        {/* Email field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="col-form-label">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required disabled />
                        </div>

                        {/* Name field */}
                        <div className="mb-3">
                            <label htmlFor="name" className="col-form-label">Full Name:</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="col-form-label">Password:</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>


                        {/* Status field */}
                        <div className="mb-3">
                            <label htmlFor="status" className="col-form-label">Status:</label>
                            <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange} required>
                                <option value="">Choose...</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Role field */}
                        <div className="mb-3">
                            <label htmlFor="role" className="col-form-label">Role:</label>
                            <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="">Choose...</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="submit" className="btn btn-primary">{user && user.id ? 'Save Changes' : 'Create User'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

UserForm.propTypes = {
    user: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UserForm;
