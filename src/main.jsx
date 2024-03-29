// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChannelsProvider } from './Contexts/ChannelsContext.jsx'; // Đảm bảo đường dẫn đến ChannelsContext đúng
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChannelsProvider> {/* Bọc <App /> bằng ChannelsProvider */}
      <App />
    </ChannelsProvider>
  </React.StrictMode>,
);
