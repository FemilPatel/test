/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const Other = () => {
  const [users, setUsers] = useState([]);
  const [newdata, setNewData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const result = Object.values(
      users.reduce((r, { age, gender, country: Country }) => {
        if (!r[Country])
          r[Country] = {
            Male: 0,
            Female: 0,
            Sum: 0,
            OldMale: 0,
            OldFemale: 0,
            YoungMale: 0,
            YoungFemale: 0,
            ChildMale: 0,
            ChildFemale: 0,
            Country,
          };

        if (age >= 0 && age <= 19) {
          if (gender === "Male") {
            r[Country].ChildMale++;
          } else if (gender === "Female") {
            r[Country].ChildFemale++;
          }
        } else if (age >= 20 && age <= 40) {
          if (gender === "Male") {
            r[Country].YoungMale++;
          } else if (gender === "Female") {
            r[Country].YoungFemale++;
          }
        } else {
          if (gender === "Male") {
            r[Country].OldMale++;
          } else if (gender === "Female") {
            r[Country].OldFemale++;
          }
        }
        r[Country][gender]++;
        r[Country].Sum++;
        return r;
      }, {})
    );

    setNewData(result);
  }, [users]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUsers(result.data);
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h1>Other Page</h1>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th rowSpan='2'>country</th>
              <th colSpan='3'>Male</th>
              <th colSpan='3'>Female</th>
              <th rowSpan='2'>Total</th>
            </tr>
            <tr>
              <th>Child</th>
              <th>Young</th>
              <th>Old</th>
              <th>Child</th>
              <th>Young</th>
              <th>Old</th>
            </tr>
          </thead>
          <tbody>
            {newdata.map((val) => {
              return (
                <tr key={val.Country}>
                  <td>{val.Country}</td>
                  <td>{val.ChildMale}</td>
                  <td>{val.YoungMale}</td>
                  <td>{val.OldMale}</td>
                  <td>{val.ChildFemale}</td>
                  <td>{val.YoungFemale}</td>
                  <td>{val.OldFemale}</td>
                  <td>{val.Sum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Other;
