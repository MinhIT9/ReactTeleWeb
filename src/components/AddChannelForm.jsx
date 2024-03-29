// AddChannelForm.jsx
import { useState } from 'react';
import axios from 'axios';

function AddChannelForm() {
    const [channelName, setChannelName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://your-mock-api-url/channels', { name: channelName });
            setChannelName(''); // Reset input after submission
            // Optionally refresh channel list or show success message
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
