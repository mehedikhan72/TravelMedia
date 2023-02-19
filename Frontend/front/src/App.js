import './App.css';
import TopNav from './TopNav';
import Posts from './Posts';
import Login from './Login';
import Register from './Register';
import './Sidebar.css';
import SideBar from './SideBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SideBar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
