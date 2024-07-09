import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Homes from './pages/Homes';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/assets/EditCar';
import Contact from './pages/Contact';
import AboutUs from './pages/About';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Homes" exact element={<Homes />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/admin/login" exact element={<AdminLogin />} />
          <Route path="/booking/:carid" exact element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
          <Route path="/userbookings" exact element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
          <Route path="/addcar" exact element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/adminhome" exact element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
          <Route path="/editcar/:carid" exact element={<AdminProtectedRoute><EditCar /></AdminProtectedRoute>} />
          <Route path="/Contact" exact element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/About" exact element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// General user protected route
export function ProtectedRoute({ children }) {
  if (localStorage.getItem('user')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

// Admin protected route
export function AdminProtectedRoute({ children }) {
  if (localStorage.getItem('adminToken')) {
    return children;
  } else {
    return <Navigate to='/admin/login' />;
  }
}
