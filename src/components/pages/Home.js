/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserStore from "../mobx/UserStore";
import { inject, observer } from "mobx-react";
import moment from "moment";

const Home = () => {
  const [users, setUser] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let text = UserStore?.name;
    const newData = users.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    if (newData) {
      setFilteredDataSource(newData);
    }
  }, [UserStore?.name]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
    setFilteredDataSource(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h1>Home Page</h1>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Email</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataSource.map((user, index) => (
              <tr key={user.id}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>

                <td>
                  <Link
                    className='btn btn-primary mr-2'
                    to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    className='btn btn-outline-primary mr-2'
                    to={`users/edit/${user.id}`}>
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default inject("UserStore")(observer(Home));
// export default Home;
