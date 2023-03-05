import './App.css';
import './Sidebar.css';

import Login from './components/Login';
import Register from './components/Register';
import SideBar from './components/SideBar';
import Profile from './components/Profile';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<SideBar />} exact path="/" />
              <Route path="profiles/:username" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
