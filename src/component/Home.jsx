import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data1 } from "./Create";

function Home() {
  const [data, setdata] = useState([]);
  const data2 = useContext(data1);
  console.log(data2);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setdata([...res.data]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <h1>List of Users</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <Link to="/create" className="btn btn-success">
              ADD +
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ds, i) => (
                <tr key={i}>
                  <td>{ds.id}</td>
                  <td>{ds.name}</td>
                  <td>{ds.email}</td>
                  <td>{ds.phone}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2">Read</button>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
