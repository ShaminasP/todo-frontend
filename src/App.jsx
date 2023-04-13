import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import HomePage from './Pages/HomePage';
import Report from './Pages/Report';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </Router>
  )
}

export default App
