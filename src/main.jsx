// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChannelsProvider } from './context/ChannelsContext.jsx'; // Đảm bảo đường dẫn đến ChannelsContext đúng
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* AuthProvider bọc bên ngoài ChannelsProvider */}
      <ChannelsProvider> {/* Bọc <App /> bằng ChannelsProvider */}
        <App />
      </ChannelsProvider>
    </AuthProvider>
  </React.StrictMode>
);
