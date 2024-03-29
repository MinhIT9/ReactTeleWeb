// src/components/SendMessForm.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS cho giao diện snow của Quill
import { useState } from "react";
import { apiService } from "../services/apiService"; // Đúng cách import

function SendMessageForm() {
  const [message, setMessage] = useState(""); // Nên giữ tên biến này là message để khớp với state
  const [channelId, setChannelId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await apiService.sendMessageToTelegramChannel(
        channelId,
        cleanMessage(message),
        "HTML"
      );
      alert("Message sent successfully to Telegram Channel!");
      setMessage(""); // Reset state
      setChannelId("");
    } catch (error) {
      alert(
        "Failed to send message to Telegram Channel: " + error.message
      );
    } finally {
      setIsLoading(false);
    }
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
    return html.replace(/<\/?p[^>]*>/g, "");
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
