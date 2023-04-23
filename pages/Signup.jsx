import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Signup.module.css";
import Router from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";
import { checkLocally } from "../redux/checkLocally";
import Loader from "./components/Loader/Loader";

const Signup = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (checkLocally(user)) {
      dispatch(loginSuccess());
    }
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [dispatch, isAuthenticated]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPASS, setShowPASS] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = () => {
    setShowLoader(true);
    // Perform signup logic here
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://crypto-backend-jet.vercel.app/api/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    };

    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(loginSuccess());
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error, error.response.data.message);
        error.response.data.message.includes("E11000 duplicate key error")
          ? alert("Email already exists")
          : alert("Invalid Credentials");
      });
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      {showLoader ? <Loader /> : ""}
      <main className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.left}>
            {/* <div className={styles.brandname}>
              <h2>Crypto King</h2>
            </div> */}
            <div className={styles.signup}>
              <div className={styles.tagline}>
                <h1>Create your account</h1>
                <p>{`Let's get started with crypto journey`}</p>
              </div>

              <div className={styles.credentials}>
                <div className={styles.email}>
                  <p>
                    Name <span className={styles.redspan}>*</span>{" "}
                  </p>
                  <div className={styles.emailWthIcon}>
                    <span>📇</span>
                    <input
                      type="email"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.email}>
                  <p>
                    Email <span className={styles.redspan}>*</span>{" "}
                  </p>
                  <div className={styles.emailWthIcon}>
                    <span>@</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.password}>
                  <p>
                    Password <span className={styles.redspan}>*</span>
                  </p>
                  <div className={styles.passwordWthIcon}>
                    <span>🔑</span>
                    <input
                      type={showPASS ? "text" : "password"}
                      placeholder="Create Password of length 8 or more"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {showPASS ? (
                      <span
                        style={{
                          padding: ".7rem",
                          paddingTop: "1rem",
                          paddingBottom: "1rem",
                          borderRadius: "10%",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPASS(false)}
                      >
                        👓
                      </span>
                    ) : (
                      <span
                        style={{
                          padding: ".7rem",
                          paddingTop: "1rem",
                          paddingBottom: "1rem",
                          borderRadius: "10%",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPASS(true)}
                      >
                        🙈
                      </span>
                    )}
                    {/* <span>👓</span> */}

                    {/* <span style={{ padding: ".7rem", paddingTop:"1rem", paddingBottom:"1rem", background: "red", borderRadius: "10%", cursor: "pointer" }} >👓</span> */}
                  </div>
                </div>

                <div className={styles.confirmpassword}>
                  <p>
                    Confirm Password <span className={styles.redspan}>*</span>
                  </p>
                  <div className={styles.confirmpasswordWthIcon}>
                    <span>🔐</span>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword === password &&
                    confirmPassword.length != 0 &&
                    password.length != 0 ? (
                      <span>✅</span>
                    ) : confirmPassword.length == 0 || password.length == 0 ? (
                      ""
                    ) : (
                      <span>❌</span>
                    )}
                  </div>
                </div>

                <button className={styles.signupButton} onClick={handleSubmit}>
                  Create account
                </button>

                <div className={styles.createAccount}>
                  <h5>
                    Already have an account?{" "}
                    <span
                      className={styles.create}
                      onClick={() => Router.push("/Login")}
                    >
                      Log in
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right}></div>
        </div>
      </main>
    </>

    // <div>
    //   <Head>
    //     <title>Signup Here</title>
    //     <meta name="description" content="Generated by create next app" />
    //   </Head>
    //   <div>
    //     This is a Signup Page
    //     <h2 onClick={() => Router.push("/Login")}> Back to login</h2>
    //   </div>
    // </div>
  );
};

export default Signup;
