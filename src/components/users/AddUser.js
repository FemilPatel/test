/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AddUser = () => {
  let history = useNavigate();
  const [Imgs, setImgs] = useState(null);
  const [user, setUser] = useState({
    id: Math.floor(Math.random() * 100000),
    name: "",
    dob: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    gender: "",
    country: "",
    // image: "",
  });

  const { name, dob, username, email, phone, website, gender, country } = user;

  const calAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onInputChange = (e) => {
    let age = calAge(dob);
    setUser({ ...user, [e.target.name]: e.target.value, age: age });
  };
  const uploadImage = async (e) => {
    let file = e.target.files[0];
    let base64 = null;
    var maxfilesize = 1024 * 1024;
    if (file.size > maxfilesize) {
      alert("File size is large");
    } else {
      base64 = await convertBase64(file);
      setUser({ ...user, image: base64 });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3003/users", user);
    history("/");
  };
  return (
    <div className='container'>
      <div className='w-75 mx-auto shadow p-5'>
        <h2 className='text-center mb-4'>Add A User</h2>
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
              placeholder='Enter Your Date of Birth'
              name='dob'
              value={dob}
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
          <div className='form-group'>
            <input
              type='file'
              className='form-control form-control-lg'
              placeholder='upload'
              name='image'
              // value={imgs}
              onChange={uploadImage}
            />
          </div>
          <button className='btn btn-primary btn-block'>Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
