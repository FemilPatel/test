/** @format */

import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "mobx-react";
import UserStore from "./components/mobx/UserStore";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Demo from "./Demo";
// import Home from "./components/pages/Home";
// import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Other from "./components/pages/Other";
import Map from "./components/pages/Map";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";

const HomeComponent = React.lazy(() => import("./components/pages/Home"));
const AboutComponent = React.lazy(() => import("./components/pages/About"));

function App(props) {
  return (
    <Provider UserStore={UserStore}>
      {/* <Demo /> */}
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<AboutComponent />} />
            <Route path='contact' element={<Contact />} />
            <Route path='users/add' element={<AddUser />} />
            <Route path='users/edit/:id' element={<EditUser />} />
            <Route path='users/:id' element={<User />} />
            <Route path='other' element={<Other />} />
            <Route path='map' element={<Map />} />
            <Route path='notfound' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
