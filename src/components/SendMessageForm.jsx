/* eslint-disable no-unused-vars */
// src/components/SendMessForm.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho giao diện snow của Quill
import React, { useState, useEffect } from 'react';
import { apiService } from "../services/apiService"; // Đúng cách import
import { useFetchChannels } from '../hooks/useFetchChannels';

function SendMessageForm() {
  const { channels } = useFetchChannels();
  const [message, setMessage] = useState(""); // Nên giữ tên biến này là message để khớp với state
  const [channelIds, setChannelIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]); // Lưu trữ mảng các file media


  useEffect(() => {
    // Reset selected channels when channels list changes
    // setChannelIds(channels.map(channel => channel.channel_id));
  }, [channels]);

  const handleChannelSelectionChange = (channelId, isChecked) => {
    setChannelIds(prevSelectedChannelIds =>
      isChecked
        ? [...prevSelectedChannelIds, channelId]
        : prevSelectedChannelIds.filter(id => id !== channelId)
    );
  };

  // Trong SendMessageForm, khi chuẩn bị dữ liệu để gửi
  const handleSendMessage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const cleanMsg = cleanMessage(message); // Sử dụng cleanMessage trước khi gửi


    // Chuẩn bị dữ liệu để gửi tin nhắn
    const promises = channelIds.map(id => {
      if (mediaFiles && mediaFiles.length > 0) {
        return apiService.sendMediaGroupToTelegramChannel(id, mediaFiles, cleanMsg);
      } else {
        // Gửi tin nhắn văn bản
        return apiService.sendMessageToTelegramChannel(id, cleanMsg, 'HTML');
      }
    });

    // Gửi tin nhắn đồng thời và đợi kết quả
    const results = await Promise.allSettled(promises);

    // Xử lý kết quả
    const successfulSends = results.filter(result => result.status === 'fulfilled');
    const failedSends = results.filter(result => result.status === 'rejected');

    if (successfulSends.length > 0) {
      alert(`Message sent successfully to ${successfulSends.length} channels.`);
    }
    if (failedSends.length > 0) {
      alert(`Failed to send message to ${failedSends.length} channels. Please try again.`);
    }

    // Reset trạng thái
    setMessage()
    setIsLoading(false);
    setMediaFiles([]); // Cân nhắc xem có reset message không dựa vào yêu cầu của bạn
  };

  const selectAllChannels = () => {
    setChannelIds(channels.map(channel => channel.channel_id));
  };

  const deselectAllChannels = () => {
    setChannelIds([]);
  };

  const cleanMessage = (html) => {
    let cleanHtml = html.replace(/<br\s*[/]?>/gi, '').replace(/<p>/gi, '\n').replace(/<\/p>/gi, '');
    return cleanHtml.trim();
  };



  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };


  return (
    <div className="container mt-3">
      <form onSubmit={handleSendMessage} className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>Channel Selection</h5>
          <div>
            <button type="button" className="btn btn-outline-primary btn-sm me-2" onClick={selectAllChannels}>Select All</button>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={deselectAllChannels}>Deselect All</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel, index) => (
              <tr
                key={channel.channel_id}
                onClick={() => handleChannelSelectionChange(channel.channel_id, !channelIds.includes(channel.channel_id))}
              >
                <th scope="row">{index + 1}</th>
                <td>{channel.channel_id}</td>
                <td>{channel.channel_name}</td>
                <td onClick={(e) => e.stopPropagation()}>{/* Dừng sự kiện lan ra khi click vào td của checkbox */}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`channel-${index}`}
                    checked={channelIds.includes(channel.channel_id)}
                    onChange={(e) => {
                      // Khi thay đổi trạng thái của checkbox, ngăn không cho sự kiện này lan ra ngoài
                      handleChannelSelectionChange(channel.channel_id, e.target.checked);
                      e.stopPropagation();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>



        </table>

        <div className="card-body">
          {/* Phần upload file và nhập tin nhắn */}
          <div className="mb-3">
            <label htmlFor="media" className="form-label">Media Files:</label>
            <input
              type="file"
              className="form-control"
              id="media"
              multiple
              onChange={(e) => setMediaFiles(Array.from(e.target.files))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <ReactQuill value={message} onChange={setMessage} />
          </div>

          {/* Nút gửi tin nhắn */}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Send Message"}
          </button>
        </div>
      </form>
    </div>

  )
}

export default SendMessageForm;