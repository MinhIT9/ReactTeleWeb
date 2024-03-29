// src/components/ChannelList.jsx
import { apiService } from "../services/apiService"; // Đúng cách import
import { useChannels } from "../hooks/useChannels";

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
      setChannels(prevChannels => prevChannels.filter(channel => channel.id !== channelId));
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  // console.log("ChannelList: ", channels);
  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          Number: {channel.channel_number}, ID: {channel.channel_id}, Name: {channel.channel_name}
          <button onClick={() => handleEdit(channel.id)}>Edit</button>
          <button onClick={() => handleDelete(channel.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ChannelList;
