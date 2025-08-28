import React, { useState } from "react";
import styles from "../CSS/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const navigate = useNavigate()

  // Handle Login (step 1)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login/register",
        {
          email: email,
          name: fullname, // backend expects name
        },
        { withCredentials: true }
      );

      console.log("Login Response:", response.data);
       localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", fullname);
      setStep(2); // move to OTP step
     
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Handle OTP Verification (step 2)
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login/verify",
        {
          otp: otp,
        },
        { withCredentials: true }
      );

      console.log("OTP Verification Response:", response.data);
      // ✅ Now user is authenticated, you can redirect or store token
      navigate("/quizlanding")
    } catch (error) {
      console.error("OTP Verification Error:", error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.innerdiv}>
        <h3>Login</h3>
        <span className={styles.subhead}>Hi, Welcome back 👋</span>

        {step === 1 && (
          <form onSubmit={handleLogin}>
            <div className={styles.email}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                className={styles.input1}
                placeholder="E.g. john2412345@akgec.ac.in"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.email}>
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                value={fullname}
                className={styles.input1}
                placeholder="E.g. Rahul Kumar"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div className={styles.forgotpass}>
              <div className={styles.remember}>
                <input type="checkbox" className={styles.rememberinput} />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <span className={styles.link}>Forgot Password?</span>
            </div>

            <button type="submit" className={styles.login1}>
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtp}>
            <div className={styles.email}>
              <label htmlFor="otp">Otp</label>
              <input
                type="text"
                value={otp}
                className={styles.input1}
                placeholder="E.g. 1234"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.login1}>
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
