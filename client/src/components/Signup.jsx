import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    age: "",
    gender: "",
    profile: null,
  });

  const [imagepreview, setImagePreview] = useState(avatar);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRadioChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmpassword ||
      !form.age ||
      !form.gender
    ) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (form.password !== form.confirmpassword) {
      setError("Password do not match");
      setIsSubmitting(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("age", form.age);
    formdata.append("gender", form.gender);
    formdata.append("password", form.password);
    if (form.profile) formdata.append("profile", form.profile);

    try {
      await axios.post("http://localhost:8000/signup", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Signup Successfully");
      window.location.reload();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:8000/google";
  };

  return (
    <section>
      <div className="container">
        <div className="signup-box">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="upload-img d-flex justify-content-center">
              <input
                type="file"
                name="profile"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="profile"
              />
              <label htmlFor="profile">
                <img
                  src={imagepreview}
                  alt="avatar"
                  height={120}
                  width={120}
                  style={{ borderRadius: "50%" }}
                />
              </label>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="box">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleOnChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
              />
            </div>

            <div className="box">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleOnChange}
                placeholder="Enter your confirm password"
              />
            </div>

            <div className="box">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={form.age}
                onChange={handleOnChange}
                placeholder="Enter your age"
              />
            </div>

            <div className="box">
              <label htmlFor="gender">Gender</label>
              <div className="gender">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  onChange={handleRadioChange}
                  value="male"
                  checked={form.gender === "male"}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  onChange={handleRadioChange}
                  value="female"
                  checked={form.gender === "female"}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <button type="submit" className="btn mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>

            <div className="d-flex mt-2 justify-content-center">
              <p>Already have an account?</p>
              <Link to="/" className="ms-2 text-decoration-none text-danger">
                Login
              </Link>
            </div>
            <button type="button" onClick={handleGoogleSignup} className="btn">
              Signup with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
