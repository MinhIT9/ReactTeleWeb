// src/components/SendMessForm.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho giao diện snow của Quill
import { useState } from "react";
import { apiService } from "../services/apiService"; // Đúng cách import

function SendMessageForm() {
  const [message, setMessage] = useState(""); // Nên giữ tên biến này là message để khớp với state
  const [channelId, setChannelId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]); // Lưu trữ mảng các file media


  // Trong SendMessageForm, khi chuẩn bị dữ liệu để gửi
  const handleSendMessage = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Xử lý tin nhắn chỉ có văn bản
    if (mediaFiles.length > 0) {
      try {
        const response = await apiService.sendMediaGroupToTelegramChannel(
          channelId, // ID của kênh
          mediaFiles, // Mảng các file media
          cleanMessage(message) // Tin nhắn sẽ được đính kèm với media đầu tiên
        );
        console.log(response);
        alert("Media sent successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to send media: " + error.message);
      }
    } else {
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

      try {
        const response = await apiService.sendMediaGroupToTelegramChannel(formData);
        console.log(response);
        // alert("Media sent successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to send media: " + error.message);
      }
    }

    // Reset trạng thái
    setMessage("");
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
        <label htmlFor="channelId" className="form-label">
          Channel ID:
        </label>
        <input
          type="text"
          className="form-control"
          id="channelId"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
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
