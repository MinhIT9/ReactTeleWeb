// src/contexts/ChannelsContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Đảm bảo bạn đã cài PropTypes
import { useFetchChannels } from '../hooks/useFetchChannels'; 

// Tạo Context object
export const ChannelsContext = createContext();

export const ChannelsProvider = ({ children }) => {
    const [channels, setChannels] = useState([]);
    const { channels: fetchedChannels, loading, error } = useFetchChannels();

     // Log state channels khi nó thay đổi
     useEffect(() => {
        if (!loading && !error) {
            setChannels(fetchedChannels);
        }
    }, [fetchedChannels, loading, error]); // Cập nhật state khi fetchedChannels thay đổi

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
