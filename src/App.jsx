// src/App.jsx
import "./App.css";
import SendMessageForm from "./Components/SendMessageForm";
import AddChannelForm from "./Components/AddChannelForm";
import ChannelList from "./Components/ChannelList"

function App() {
  return (
    <>
      <div className="App">
        <h1>Send Message to Channel</h1>
        <SendMessageForm />
        <h2>Add New Channel</h2>
        <AddChannelForm />
        <h2>Channel List</h2>
        <ChannelList />
      </div>
    </>
  );
}

export default App;
