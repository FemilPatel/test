/** @format */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [ImgData, setImgData] = useState(null);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    webiste: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  };
  return (
    <div className='container py-4'>
      <Link className='btn btn-primary' to='/'>
        back to Home
      </Link>
      <h1 className='display-4'>User Id: {id}</h1>
      <hr />
      <ul className='list-group w-50'>
        <li className='list-group-item'>name: {user.name}</li>
        <li className='list-group-item'>date of birth: {user.dob}</li>
        <li className='list-group-item'>age: {user.age}</li>
        <li className='list-group-item'>user name: {user.username}</li>
        <li className='list-group-item'>email: {user.email}</li>
        <li className='list-group-item'>phone: {user.phone}</li>
        <li className='list-group-item'>website: {user.website}</li>
        <li className='list-group-item'>website: {user.gender}</li>
        <li className='list-group-item'>country: {user.country}</li>
        <li className='list-group-item'>
          image: <img width={100} height={100} src={user?.image} />
        </li>
      </ul>
    </div>
  );
};

export default User;
