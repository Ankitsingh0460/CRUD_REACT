import React, { createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

const data1 = createContext();
function Create() {
  const [value, setvalue] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const [creatData, setCreateData] = useState([]);
  const onHandleSubmitt = (event) => {
    event.preventDefault(),
      axios
        .post("https://jsonplaceholder.typicode.com/users", value)
        .then((res) => {
          setCreateData(res.data);
          navigate("/");
        })

        .catch((err) => console.log(err));
  };

  return (
    <>
      <data1.Provider value={creatData}>
        <Home />
      </data1.Provider>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Add a User</h1>
          <form onSubmit={onHandleSubmitt}>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => setvalue({ ...value, name: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e) => setvalue({ ...value, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={(e) => setvalue({ ...value, phone: e.target.value })}
              />
            </div>
            <button className="btn btn-success">Submit</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
export { data1 };
