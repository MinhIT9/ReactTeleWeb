// src/authauthService.js
import axios from 'axios';
import { API_AUTH_URL } from '../services/apiService';

console.log("API_auth: ", API_AUTH_URL);

export const authService = {
    // Phương thức đăng ký
    register: async (data) => {
        const defaultData = {
            ...data,
            role: 'user', // Đặt role mặc định là 'user'
            status: 'pending' // Đặt status mặc định là 'inactive'
        };
    
        try {
            const response = await axios.post(`${API_AUTH_URL}`, defaultData);
            return response.data;
        } catch (error) {
            console.error('An error occurred during registration:', error);
            throw error; // Gửi lỗi để có thể bắt và hiển thị thông báo ngoài giao diện
        }
    },
    // Phương thức đăng nhập
    login: async (email, password) => {
        try {
            // Bạn cần chắc chắn rằng bạn đang gửi request đến endpoint đúng và nhận được mảng người dùng.
            const response = await axios.get(`${API_AUTH_URL}`);
            // Dùng find trên mảng để tìm người dùng phù hợp.
            const user = response.data.find(user => user.email === email && user.password === password);
            return user ? { success: true, user } : { success: false };
        } catch (error) {
            console.error('An error occurred during login:', error);
            return { success: false };
        }
    },
};
