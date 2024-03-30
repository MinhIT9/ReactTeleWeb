/* eslint-disable no-unused-vars */
// src/components/SendMessForm.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho giao diện snow của Quill
import React, { useState, useEffect } from 'react';
import { apiService } from "../services/apiService"; // Đúng cách import

function SendMessageForm() {
  const [message, setMessage] = useState(""); // Nên giữ tên biến này là message để khớp với state
  const [channelId, setChannelId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]); // Lưu trữ mảng các file media
  const [channels, setChannels] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);



  const handleChannelSelectionChange = (e) => {
    // Lấy tất cả các option được chọn và trích xuất giá trị của chúng
    const selectedOptions = Array.from(e.target.options).filter(option => option.selected);
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedChannels(selectedValues);
    console.log('ChannelValueSelected:',  selectedValues);
    // console.log('ChannelsValue:', channels);
  };

  useEffect(() => {
    // Log ra console để kiểm tra
    // console.log('Channels:', channels);

    // Bạn cũng có thể gọi API tại đây để lấy channels nếu chúng chưa có sẵn
    const fetchChannels = async () => {
      try {
        const data = await apiService.getChannels();
        setChannels(data);
        // console.log('Fetched Channels:', data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    // Nếu channels chưa có sẵn, thì gọi hàm fetchChannels
    if (channels.length === 0) {
      fetchChannels();
    }
  }, []);


  // Trong SendMessageForm, khi chuẩn bị dữ liệu để gửi
  const handleSendMessage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const promises = [];

    for (const channelId of selectedChannels) {
      if (mediaFiles.length > 0) {
        // Xử lý gửi tin nhắn có kèm theo media
        const formData = new FormData();
        formData.append('chat_id', channelId);
        const mediaData = mediaFiles.map((file, index) => ({
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          media: 'attach://' + file.name,
          caption: index === 0 ? cleanMessage(message) : undefined
        }));
        formData.append('media', JSON.stringify(mediaData));
        mediaFiles.forEach((file) => {
          formData.append(file.name, file);
        });

        // Đẩy promise vào mảng promises mà không chờ đợi ở đây
        promises.push(apiService.sendMediaGroupToTelegramChannel(
          channelId,
          formData
        ));

      } else {
        // Đẩy promise gửi tin nhắn văn bản vào mảng promises
        promises.push(apiService.sendMessageToTelegramChannel(
          channelId,
          cleanMessage(message),
          'HTML'
        ));
      }
    }

    try {
      // Chờ tất cả promises hoàn thành
      const responses = await Promise.all(promises);
      console.log(responses);
      alert("Tin nhắn đã được gửi thành công đến tất cả các kênh đã chọn!");
    } catch (error) {
      console.error("Có lỗi khi gửi tin nhắn: ", error);
      alert("Không thể gửi tin nhắn. Lỗi: " + error.message);
    } finally {
      // Reset trạng thái sau khi gửi tin
      setMessage("");
      setMediaFiles([]);
      setSelectedChannels([]); // Đảm bảo cũng reset lựa chọn kênh
      setIsLoading(false);
    }
  };





  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link"],
    ],
  };

  const cleanMessage = (html) => {
    // Thay thế các thẻ <br> bằng newline
    let cleanHtml = html.replace(/<br\s*[/]?>/gi, '');
    // Thay thế các thẻ <p> bằng newline và xóa các thẻ </p>
    cleanHtml = cleanHtml.replace(/<p>/gi, '\n').replace(/<\/p>/gi, '');
    // Cắt khoảng trắng thừa ở đầu và cuối chuỗi
    cleanHtml = cleanHtml.trim();
    return cleanHtml;
  };


  return (
    <form onSubmit={handleSendMessage}>
      <div className="mb-3">
        <label htmlFor="channelId" className="form-label">
          Select Channel(s):
        </label>
        <select
          className="form-select"
          id="channelId"
          value={selectedChannels}
          onChange={handleChannelSelectionChange}
          multiple
        >
          {channels.map((channel) => (
            <option key={channel.channel_id} value={channel.channel_id}>
              {`${channel.channel_name} (ID: ${channel.channel_id})`}
            </option>
          ))}

        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="media" className="form-label">
          Media Files:
        </label>
        <input
          type="file"
          className="form-control"
          id="media"
          multiple
          onChange={(e) => setMediaFiles(Array.from(e.target.files))}
        />
      </div>


      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message:
        </label>
        <ReactQuill
          value={message}
          onChange={setMessage}
          modules={modules}
        />
      </div>


      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default SendMessageForm;