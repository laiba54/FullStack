import Login from './components/Login'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './components/Signup'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Users from './components/Users.'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionExists = document.cookie.includes('session');
    const authToken = document.cookie.includes('uid') ;
    if (sessionExists && authToken) {
      setIsAuthenticated(true); 
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={ isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
