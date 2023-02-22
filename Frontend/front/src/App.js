import './App.css';
import './Sidebar.css';

import Login from './components/Login';
import Register from './components/Register';
import SideBar from './components/SideBar';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<SideBar />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
