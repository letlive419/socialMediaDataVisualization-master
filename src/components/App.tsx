import React from 'react';
import Home from "./Home";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Engagement from './Engagement';


function App() {
  return (
    <BrowserRouter>
    {/* Handle the routing of the application */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    <Route path='/Engagement' element={<Engagement/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
