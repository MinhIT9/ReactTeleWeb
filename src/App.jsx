// src/services/app.jsx
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebars } from "./Components/Layouts/Sidebars";
import { Header } from "./Components/Layouts/Header";
import ChannelsPage from "./pages/ChannelsPage";
import MessagePage from "./pages/MessagesPage";
import { Dashboard } from "./pages/Dashboard";

function App() {

  return (
    <>
     <Router>
 <Header />

      <div className="container-fluid">
        <div className="row">

          <Sidebars />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage-channels" element={<ChannelsPage />} />
              <Route path="/manage-message" element={< MessagePage />} />
              {/* Thêm các route khác tại đây */}
            </Routes>
          </main>
        </div>
      </div>
     </Router>
     

    </>
  );
}

export default App;
