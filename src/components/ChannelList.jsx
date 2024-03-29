// src/components/ChannelList.jsx
import { apiService } from "../services/apiService"; // Đúng cách import
import { useChannels } from "../Contexts/ChannelsContext";

function ChannelList() {
  const { channels, setChannels } = useChannels();

  // Định nghĩa hàm handleEdit tạm thời
  const handleEdit = (channelId) => {
    console.log('Edit channel', channelId);
    // TODO: Thêm logic chỉnh sửa channel ở đây
  };

  const handleDelete = async (channelId) => {
    try {
      await apiService.deleteChannel(channelId);
      setChannels(prevChannels => prevChannels.filter(channel => channel.id !== channelId)); // Cập nhật state
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          {channel.channel_name}
          <button onClick={() => handleEdit(channel.id)}>Edit</button>
          <button onClick={() => handleDelete(channel.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ChannelList;
