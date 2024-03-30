// AddChannelForm.jsx
import { useState } from "react";
import { apiService } from '../services/apiService';
import { useChannels } from "../hooks/useChannels";


function AddChannelForm() {
    const [channelName, setChannelName] = useState('');
    const { setChannels } = useChannels(); // Sử dụng custom hook


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newChannel = await apiService.addChannel({ channel_name: channelName });
            setChannels(prevChannels => [...prevChannels, newChannel]);
            setChannelName(''); // Reset input after submission
        } catch (error) {
            console.error("Error adding channel:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Channel Name"
                required
            />
            <button type="submit">Add Channel</button>
        </form>
    );
}

export default AddChannelForm;
