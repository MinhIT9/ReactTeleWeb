/* eslint-disable no-unused-vars */
// src/pages/UserManagementPage.jsx

import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import UserForm from '../Components/UserForm';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await apiService.getUsers(); // Hãy tạo hàm này trong apiService
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user); // Thiết lập người dùng đang được chỉnh sửa
        setShowModal(true);   // Mở modal
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await apiService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleUpdateUser = async (userData) => {
        const updatedUser = await apiService.updateUser(editingUser.id, {
            // Chúng ta chỉ gửi những trường dữ liệu được phép cập nhật
            name: userData.name,
            password: userData.password,
            status: userData.status,
            role: userData.role,
            // thêm các trường khác mà bạn muốn cho phép cập nhật
        });
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
        setShowModal(false);
    };

    // Hàm này sẽ đóng form chỉnh sửa người dùng
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className='container mt-3'>
            <h2>User Management</h2>
            <button onClick={() => { setEditingUser({}); setShowModal(true); }} className="btn btn-success mb-3">
                Add New User
            </button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} className="btn btn-primary mr-2">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <span> </span>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Modal */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                                <UserForm user={editingUser} onSave={handleUpdateUser} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;
