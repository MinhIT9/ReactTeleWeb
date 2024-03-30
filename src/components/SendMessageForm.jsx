// src/components/SendMessForm.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho giao diện snow của Quill
import { useState } from "react";
import { apiService } from "../services/apiService"; // Đúng cách import

function SendMessageForm() {
  const [message, setMessage] = useState(""); // Nên giữ tên biến này là message để khớp với state
  const [channelIds, setChannelIds] = useState([]); // Sửa đổi state này để lưu trữ mảng các ID
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]); // Lưu trữ mảng các file media


  // Trong SendMessageForm, khi chuẩn bị dữ liệu để gửi
  const handleSendMessage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let successfulSends = [];
    let failedSends = [];


    for (let id of channelIds) {
      if (mediaFiles && mediaFiles.length > 0) {
        // Xử lý gửi tin nhắn có kèm theo media
        const formData = new FormData();
        formData.append('chat_id', id);
        const mediaData = mediaFiles.map((file, index) => ({
          type: file.type.startsWith('image/') ? 'photo' : 'video',
          media: 'attach://' + file.name,
          caption: index === 0 ? cleanMessage(message) : undefined
        }));
        formData.append('media', JSON.stringify(mediaData));
        mediaFiles.forEach((file) => {
          formData.append(file.name, file);
        });

        try {
          const response = await apiService.sendMediaGroupToTelegramChannel(
            id,
            mediaFiles, // Đảm bảo rằng đây là một mảng các file
            cleanMessage(message)
          );
          console.log(response);
          // alert("Media sent successfully!");
        } catch (error) {
          console.error(error);
          alert("Failed to send media: " + error.message);
        }
      } else {
        // Thêm phần này để xử lý gửi tin nhắn văn bản khi không có media files
        try {
          // Gửi tin nhắn văn bản và đợi kết quả
          await apiService.sendMessageToTelegramChannel(
            id,
            cleanMessage(message),
            'HTML' // Hoặc 'Markdown'
          );
          successfulSends.push(id); // Thêm vào danh sách thành công
          // alert("Message sent successfully!");
        } catch (error) {
          console.error(`Failed to send message to channel ${id}:`, error);
          failedSends.push(id); // Thêm vào danh sách thất bại
        }
      }
    }

    // Cung cấp thông tin phản hồi cho người dùng
    if (successfulSends.length > 0) {
      alert(`Message sent successfully to channels: ${successfulSends.join(', ')}`);
    }
    if (failedSends.length > 0) {
      alert(`Failed to send message to channels: ${failedSends.join(', ')}`);
    }

    // Reset trạng thái
    // setMessage("");
    // setChannelId("");
    setMediaFiles([]);
    setIsLoading(false);
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
        <label htmlFor="channelIds" className="form-label">
          Channel IDs (separate by commas):
        </label>
        <input
          type="text"
          className="form-control"
          id="channelIds"
          value={channelIds.join(', ')} // Thay đổi cách hiển thị value
          onChange={(e) => setChannelIds(e.target.value.split(',').map(id => id.trim()))} // Thay đổi cách set giá trị
          required
        />
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