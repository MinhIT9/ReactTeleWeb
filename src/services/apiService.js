// src/services/apiService.js

import axios from 'axios';

// Các biến môi trường
const BOT_TOKEN = '6952515983:AAHYtunwvxyA_iGQ3tFcWcsILRSRAMEWI1I'; 
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const MESSAGES_API = 'https://66069142be53febb857e308e.mockapi.io/MESSAGES'

console.log("MESSAGES_API: ", BOT_TOKEN);
console.log("MESSAGES_API: ", MESSAGES_API);

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

     // Hàm gửi tin nhắn đến Mock API (nếu cần)
    sendMessageToMockChannel: async (channelId, messageText) => {
        const response = await axios.post(`${MESSAGES_API}`, {
            channelId,
            messageText
        });
        return response.data;
    },
};
