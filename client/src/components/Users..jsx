import Navbar from "../header/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://full-stack-server-two.vercel.app/getallusers")
      .then((response) => {
        if (response.data.length === 0) {
          navigate("/");
        } else {
          setUsers(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <>
      <Navbar />

      <h1 className="mt-5 text-dark text-center">User Profile</h1>
      <div className="profile-container d-flex flex-wrap px-2">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} style={{ margin: "0 auto" }}>
              <div
                className="d-flex flex-column mt-3 alert alert-primary"
                style={{ width: "300px" }}
              >
                <div className="mt-2 d-flex justify-content-center">
                  <img
                    src={`https://full-stack-server-two.vercel.app/uploads/${user.profile}`}
                    width={80}
                    height={80}
                    style={{ borderRadius: "50%" }}
                    alt="User Profile"
                  />
                </div>
                <span className="fw-semibold mt-3">
                  Username: <span className="ms-2 fw-normal">{user.name}</span>
                </span>
                <span className="fw-semibold">
                  Email: <span className="ms-2 fw-normal">{user.email}</span>
                </span>
                <span className="fw-semibold">
                  Age: <span className="ms-2 fw-normal">{user.age}</span>
                </span>
                <span className="fw-semibold">
                  Gender: <span className="ms-2 fw-normal">{user.gender}</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </>
  );
};

export default Users;
