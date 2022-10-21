import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Academics from "./components/Academics";
import Admission from "./components/Admission";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
    <NotificationContainer />
      <div className="App-content">
        <Router>
          <header className="App-header">
            <Link to="/home" className="link">Home</Link>
            <Link to="/academics" className="link">Academics</Link>
            <Link to="/admission" className="link">Admission</Link>
          </header>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/academics" element={<Academics />} />
            <Route exact path="/admission" element={<Admission />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
