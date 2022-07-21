/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    gender: "",
    country: "",
  });

  const { name, username, email, phone, website, gender, country } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, user);
    history("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };
  return (
    <div className='container'>
      <div className='w-75 mx-auto shadow p-5'>
        <h2 className='text-center mb-4'>Edit A User</h2>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Name'
              name='name'
              value={name}
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Username'
              name='username'
              value={username}
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control form-control-lg'
              placeholder='Enter Your E-mail Address'
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Phone Number'
              name='phone'
              value={phone}
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control form-control-lg'
              placeholder='Enter Your Website Name'
              name='website'
              value={website}
              onChange={onInputChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='radio'
              value='Male'
              name='gender'
              checked={gender === "Male"}
              onChange={onInputChange}
            />
            {`\t`} Male{`\t`}
            <input
              type='radio'
              value='Female'
              name='gender'
              checked={gender === "Female"}
              onChange={onInputChange}
            />
            {`\t`} Female
          </div>
          <div className='form-group'>
            <select
              name='country'
              id='country'
              className='form-control form-control-lg'
              placeholder='country'
              value={country}
              onChange={onInputChange}>
              <option name=' ' value=''>
                {" "}
                Select Country{" "}
              </option>
              <option name='India' value='India'>
                India
              </option>
              <option name='United Kindom' value='United Kindom'>
                United Kindom
              </option>
              <option name='America' value='America'>
                America
              </option>
              <option name='Canada' value='Canada'>
                Canada
              </option>
              <option name='Germany' value='Germany'>
                Germany
              </option>
            </select>
          </div>
          <button className='btn btn-warning btn-block'>Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
