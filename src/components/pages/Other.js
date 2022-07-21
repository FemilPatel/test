/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const Other = () => {
  const [users, setUser] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const m = users.filter((val) => val.gender === "Male");
    const f = users.filter((val) => val.gender === "Female");
    setMale(m.length);
    setFemale(f.length);
  }, [users]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h1>Other Page</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>country</th>
              <th scope='col'>Male</th>
              <th scope='col'>Female</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>India</td>
              <td>{male}</td>
              <td>{female}</td>
              <td>{male + female}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Other;
