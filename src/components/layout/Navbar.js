/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import UserStore from "../mobx/UserStore";

const Navbar = () => {
  const [search, setsearch] = useState();

  useEffect(() => {
    if (search !== undefined && search !== null) {
      UserStore.setName(search);
    }
  }, [search]);

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Recat User
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='contact'>
                  Contact
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='other'>
                  Other
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='map'>
                  Map
                </NavLink>
              </li>
            </ul>
          </div>

          <Link className='btn btn-outline-light' to='users/add'>
            Add User
          </Link>
        </div>
        <div className='d-flex'>
          <input
            className='form-control'
            type='search'
            placeholder='Search'
            aria-label='Search'
            name='search'
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>

        <Link className='btn btn-primary ml-2' to='login'>
          Login
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

// export default Navbar;
export default inject("UserStore")(observer(Navbar));
