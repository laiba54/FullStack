import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!form.email || !form.password) {
      setError("All fields are required!");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post("https://full-stack-server-two.vercel.app/login", form, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://full-stack-server-two.vercel.app/google";
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className="textbox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleOnChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="textbox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleOnChange}
                disabled={isSubmitting}
              />
            </div>
            {error && <p className="error text-danger">{error}</p>}
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            <div className="d-flex mt-2 justify-content-center">
              <p>Dont have an account?</p>
              <Link
                to="/signup"
                className="ms-2 text-decoration-none text-danger"
              >
                Signup
              </Link>
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
