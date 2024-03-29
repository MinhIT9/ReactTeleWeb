// src/services/apiService.js

import axios from 'axios';

// Các biến môi trường
const BOT_TOKEN = '6952515983:AAHYtunwvxyA_iGQ3tFcWcsILRSRAMEWI1I';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const CHANNEL_API = 'https://660537b52ca9478ea17fb81f.mockapi.io/TTG/Channels'

console.log("BOT_TOKEN: ", BOT_TOKEN);
console.log("TELEGRAM_API_URL: ", TELEGRAM_API_URL);
console.log("CHANNEL_API: ", CHANNEL_API);

export const apiService = {
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


