/** @format */

import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
const Navbar = () => {
  const [search, setsearch] = useState("");

  const searchChanged = (e) => {
    // console.log("e", e.traget.value);
    // setsearch({ search: e.traget.value });
  };

  useEffect(() => {
    // console.log("text", search);
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
            </ul>
          </div>

          <Link className='btn btn-outline-light' to='users/add'>
            Add User
          </Link>
        </div>
        <form className='d-flex' role='search'>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            name='search'
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </form>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
