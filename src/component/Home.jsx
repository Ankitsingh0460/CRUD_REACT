import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Create, { data1 } from "./Create";
import { Link } from "react-router-dom";

function Home() {
  const [data, setdata] = useState([]);
  const data2 = useContext(data1);
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(data2);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setdata([...res.data]))
      .catch((err) => console.log(err));
  }, []);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCreateuser = async (e, name, email, phone) => {
    setLoading(true);
    e.preventDefault();
    try {
      const responce = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name,
          email,
          phone,
        }
      );
      console.log(responce.data);
      setdata([...data, responce.data]);
      setOpenCreate(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <h1>List of Users</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          <div
            onClick={handleOpenCreate}
            className="d-flex justify-content-end"
          >
            <div className="btn btn-success">ADD +</div>
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
                    <Link
                      to={`/read/${ds.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Read
                    </Link>
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
        {openCreate && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white   w-[900px] p-4 z-10 rounded-xl">
              <p
                onClick={handleCloseCreate}
                className="py-2 px-3 cursor-pointer self-end text-end rounded-full"
              >
                X
              </p>
              <Create loading={loading} handleCreate={handleCreateuser} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
