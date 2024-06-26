// src/services/apiService.js

import axios from 'axios';

// Các biến môi trườngA
const BOT_TOKEN = '6952515983:AAHYtunwvxyA_iGQ3tFcWcsILRSRAMEWI1I';

export const API_AUTH_URL = "https://66069142be53febb857e308e.mockapi.io/Users";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const CHANNEL_API = 'https://6601e3599d7276a755525496.mockapi.io/channels'

console.log("BOT_TOKEN: ", BOT_TOKEN);
console.log("TELEGRAM_API_URL: ", TELEGRAM_API_URL);
console.log("CHANNEL_API: ", CHANNEL_API);

export const apiService = {
    addUser: async (userData) => {
        const response = await axios.post(API_AUTH_URL, userData);
        return response.data;
    },
    // Cập nhật người dùng
    updateUser: async (userId, userData) => {
        const response = await axios.put(`${API_AUTH_URL}/${userId}`, userData);
        return response.data;
    },
    // Xóa người dùng
    deleteUser: async (userId) => {
        const response = await axios.delete(`${API_AUTH_URL}/${userId}`);
        return response.data;
    },
    // Lấy người dùng
    getUsers: async () => {
        const response = await axios.get(`${API_AUTH_URL}`);
        return response.data;
    },


    // Hàm gửi nhóm media đến Telegram channel
    sendMediaGroupToTelegramChannel: async (channelId, mediaArray, caption = '') => {
        const formData = new FormData();
        formData.append('chat_id', channelId);

        // Tạo một mảng chứa các đối tượng media với caption cho media đầu tiên
        const mediaData = mediaArray.map((file, index) => ({
            type: file.type.startsWith('image/') ? 'photo' : 'video',
            media: 'attach://' + file.name,
            // Chỉ đính kèm caption cho media đầu tiên
            caption: index === 0 ? caption : undefined,
            parse_mode: 'HTML' // Hoặc Markdown, tùy thuộc vào định dạng của bạn
        }));

        // Thêm dữ liệu media vào formData
        formData.append('media', JSON.stringify(mediaData));

        // Thêm từng file media vào formData
        mediaArray.forEach(file => {
            formData.append(file.name, file);
        });

        // Gửi yêu cầu
        const response = await axios.post(`${TELEGRAM_API_URL}/sendMediaGroup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },


    // Hàm gửi tin nhắn đến Telegram channel
    sendMessageToTelegramChannel: async (channelId, messageText, format) => {
        const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: channelId,
            text: messageText,
            parse_mode: format // Thêm dòng này
        });
        return response.data;
    },

    addChannel: async (channelData) => {
        const response = await axios.post(CHANNEL_API, channelData);
        return response.data;
    },

    //   lấy danh sách các kênh
    getChannels: async () => {
        const response = await axios.get(`${CHANNEL_API}`);
        return response.data;
    },
    // cập nhật thông tin kênh
    updateChannel: async (channelId, channelData) => {
        const response = await axios.put(`${CHANNEL_API}/${channelId}`, channelData);
        return response.data;
    },
    // xóa kênh
    deleteChannel: async (channelId) => {
        const response = await axios.delete(`${CHANNEL_API}/${channelId}`);
        return response.data;
    }
};


