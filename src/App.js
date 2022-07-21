/** @format */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Other from "./components/pages/Other";

function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='users/add' element={<AddUser />} />
        <Route path='users/edit/:id' element={<EditUser />} />
        <Route path='users/:id' element={<User />} />
        <Route path='other' element={<Other />} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
