// src/services/apiService.js

import axios from 'axios';

// Các biến môi trường
const BOT_TOKEN = '6952515983:AAHYtunwvxyA_iGQ3tFcWcsILRSRAMEWI1I';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const CHANNEL_API = 'https://660537b52ca9478ea17fb81f.mockapi.io/TTG/Channels'

// const MESSAGES_API = 'https://66069142be53febb857e308e.mockapi.io/MESSAGES'

export const apiService = {
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

    getChannels: async () => {
        const response = await axios.get(`${CHANNEL_API}`);
        return response.data;
    },
    updateChannel: async (channelId, channelData) => {
        const response = await axios.put(`${CHANNEL_API}/${channelId}`, channelData);
        return response.data;
    },
    deleteChannel: async (channelId) => {
        const response = await axios.delete(`${CHANNEL_API}/${channelId}`);
        return response.data;
    }
};
