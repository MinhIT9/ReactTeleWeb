// src/services/apiService.js

import axios from 'axios';

// Các biến môi trường
const BOT_TOKEN = '6952515983:AAHYtunwvxyA_iGQ3tFcWcsILRSRAMEWI1I';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const CHANNEL_API = 'https://6601e3599d7276a755525496.mockapi.io/channels'

console.log("BOT_TOKEN: ", BOT_TOKEN);
console.log("TELEGRAM_API_URL: ", TELEGRAM_API_URL);
console.log("CHANNEL_API: ", CHANNEL_API);

export const apiService = {
    // Hàm gửi nhóm media đến Telegram channel
    sendMediaGroupToTelegramChannel: async (channelId, mediaArray, caption = '') => {
        const formData = new FormData();
        formData.append('chat_id', channelId);

        // Tạo mảng các đối tượng media để gửi đi
        const mediaData = mediaArray.map((file, index) => ({
            type: file.type.startsWith('image/') ? 'photo' : 'video',
            media: 'attach://' + file.name,
            caption: index === 0 ? caption : undefined,
        }));
        // Chú ý: Không chuyển đổi cả mảng mediaData thành chuỗi JSON trước khi thêm vào FormData
        formData.append('media', JSON.stringify(mediaData));

        // Thêm từng file media vào FormData
        mediaArray.forEach(file => {
            formData.append(file.name, file);
        });

        try {
            const response = await axios.post(`${TELEGRAM_API_URL}/sendMediaGroup`, formData, {
                headers: {
                    // Axios sẽ tự động set đúng Content-Type header cho FormData
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending media group:', error);
            if (error.response) {
                console.error('Response:', error.response);
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            throw error;
        }
    },



    // Hàm gửi tin nhắn đến Telegram channel
    sendMessageToTelegramChannel: async (channelId, messageText, format) => {
        try {
          const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
            chat_id: channelId,
            text: messageText,
            parse_mode: format
          });
          return response.data;
        } catch (error) {
          console.error('Error sending message:', error);
          // Có thể bạn muốn xử lý lỗi chi tiết hơn tại đây
          throw error; // Hoặc xử lý lỗi theo một cách khác tuỳ thuộc vào logic của bạn
        }
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


