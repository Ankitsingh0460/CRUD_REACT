import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setdata(res.data))

      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="d-flex w-100 vh-100 justfiy-content-center align-items-center bg-light ">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded ">
          <h3>Details of User</h3>
          <div className="mb-2">
            <strong>Name:{data.name}</strong>
          </div>
          <div className="mb-2">
            <strong>Email:{data.email}</strong>
          </div>
          <div className="mb-2">
            <strong>Phone:{data.phone}</strong>
          </div>
          <Link to={`/update/${id}`} className="btn btn-success">
            Edit
          </Link>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default Read;
