import React, { useState } from "react";
import styles from "../CSS/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const [loading, setLoading] = useState(false); // for button disabling
  const navigate = useNavigate();

  // Handle Login (step 1)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // disable button
    try {
      const response = await axios.post(
        "https://final-quiz-portal.onrender.com/api/login/register",
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
      setLoading(false); // re-enable when OTP page loads
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false); // re-enable in case of error
    }
  };

  // Handle OTP Verification (step 2)
  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // disable button during verification
    try {
      const response = await axios.post(
        "https://final-quiz-portal.onrender.com/api/login/verify",
        {
          otp: otp,
        },
        { withCredentials: true }
      );

      console.log("OTP Verification Response:", response.data);
      navigate("/quizlanding");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setLoading(false); // re-enable on error
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

            <button
              type="submit"
              className={styles.login1}
              disabled={loading} // disable when loading
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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
            <button
              type="submit"
              className={styles.login1}
              disabled={loading} // disable when loading
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
