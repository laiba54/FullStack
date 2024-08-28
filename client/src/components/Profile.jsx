import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import ForgetPassword from "./ForgetPassword";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    profile: null,
  });
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profile: e.target.files[0] });
  };

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("age", form.age);
    formdata.append("gender", form.gender);
    if (form.profile) formdata.append("profile", form.profile);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `http://localhost:8000/updateusers/${editingUser._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditingUser(null);
      setForm({ name: "", email: "", age: "", gender: "", profile: null });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }, [form, editingUser]);

  const handleEditClick = useCallback(() => {
    if (user) {
      setEditingUser(user);
      setForm({
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profile: null,
      });
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get("http://localhost:8000/getusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const users = response.data;
        if (users.length > 0) {
          setUser(users[0]);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching user:",
          err.response ? err.response.data : err.message
        );
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
      });
  }, [navigate]);

  const handleForgetPasswordClick = () => {
    setShowForgetPassword(true);
  };

  return (
    <>
      <Navbar profile={user?.profile} name={user?.name}/>
      {!showForgetPassword ? (
      <div className="d-lg-flex d-md-flex-column d-sm-flex-column px-2">
        {user ? (
          <div className="py-4 ms-lg-5 ms-md-0 ms-sm-0">
            <h1 className="mt-2 text-dark text-start">User Profile</h1>
            <div className="d-flex flex-column mt-3">
              <div className="mt-5">
                <img
                  src={`http://localhost:8000/uploads/${user.profile}`}
                  width={120}
                  height={120}
                  style={{ borderRadius: "50%" }}
                  alt="User Profile"
                />
              </div>
              <div className="mt-5 text-dark">
                <h5>
                  Username: <span className="ms-2 fw-normal">{user.name}</span>
                </h5>
              </div>
              <div className="mt-2 text-dark">
                <h5>
                  Email: <span className="ms-2 fw-normal">{user.email}</span>
                </h5>
              </div>
              <div className="mt-2 text-dark">
                <h5>
                  Age: <span className="ms-2 fw-normal">{user.age}</span>
                </h5>
              </div>
              <div className="mt-2 text-dark">
                <h5>
                  Gender: <span className="ms-2 fw-normal">{user.gender}</span>
                </h5>
              </div>
              <button className="btn w-50 mt-3" onClick={handleEditClick}>
                Edit Profile
              </button>
              <button className="btn w-50 mt-3" onClick={handleForgetPasswordClick}>
                Forget Password
              </button>
            </div>
          </div>
        ) : (
          <p>No user found</p>
        )}
        <div className="Edit-profile px-2 pb-2 ms-lg-5 ms-md-0 ms-sm-0">
          {editingUser && (
            <form onSubmit={handleFormSubmit} className="mt-4">
              <h1>Edit Profile</h1>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={form.age}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="profile" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn">
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
      ) : (
        <ForgetPassword />
      )}
    </>
  );
};

export default Profile;
