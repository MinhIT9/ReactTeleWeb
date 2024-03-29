// src/contexts/ChannelsContext.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Đảm bảo bạn đã cài PropTypes

// Tạo Context object
export const ChannelsContext = createContext();

export const ChannelsProvider = ({ children }) => {
    const [channels, setChannels] = useState([]);


    return (
        <ChannelsContext.Provider value={{ channels, setChannels }}>
            {children}
        </ChannelsContext.Provider>
    );
}

// Sử dụng PropTypes để xác thực props
ChannelsProvider.propTypes = {
    children: PropTypes.node.isRequired, // node có thể là bất cứ thứ gì có thể được render: số, chuỗi, elements hoặc một array chứa những thứ này
};


// Tạo một custom hook để sử dụng context dễ dàng hơn
export const useChannels = () => {
    const context = useContext(ChannelsContext);
    if (context === undefined) {
      throw new Error('useChannels must be used within a ChannelsProvider');
    }
    return context;
  };
