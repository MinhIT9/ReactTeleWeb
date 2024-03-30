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
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Link</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, index) => (
            <tr key={channel.id}>
              <td>{index + 1}</td>
              <td>{channel.channel_id}</td>
              <td>{channel.channel_name}</td>
              <td>{/* Hiển thị link nếu có */}</td>
              <td>
                <div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => handleEdit(channel.id)}>Edit</button>
                  <span> </span>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(channel.id)}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChannelList;
