import { useState } from "react";
import axios from "axios";
import "./style.css";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    oldpassword: "",
    password: "",
    confirmpassword: "",
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!form.oldpassword || !form.password || !form.confirmpassword) {
      setError("All fields are required!");
      setIsSubmitting(false);
      return;
    }

    if (form.password !== form.confirmpassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://full-stack-server-two.vercel.app/forgetpassword",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setSuccess("Password changed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Password change failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-msg-container" style={{ width: "400px" }}>
      <div className="alert alert-success">
        <form onSubmit={handleFormSubmit}>
          <div className="textbox" style={{ fontSize: "12px" }}>
            <label htmlFor="oldpassword">Old Password</label>
            <input
              type="password"
              id="oldpassword"
              name="oldpassword"
              placeholder="Enter your old password"
              value={form.oldpassword}
              onChange={handleOnChange}
            />
          </div>
          <div className="textbox" style={{ fontSize: "12px" }}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={form.password}
              onChange={handleOnChange}
            />
          </div>
          <div className="textbox" style={{ fontSize: "12px" }}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={form.confirmpassword}
              onChange={handleOnChange}
              placeholder="Confirm your new password"
            />
          </div>
          {error && (
            <p className="error text-danger" style={{ fontSize: "12px" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="success text-success" style={{ fontSize: "12px" }}>
              {success}
            </p>
          )}
          <button
            className="btn"
            style={{ fontSize: "14px" }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
