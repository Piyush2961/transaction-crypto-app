import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/authActions";
import { checkLocally } from "./checkLocally";

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

  return (
    <div>
      <Head>
        <title>Signup Here</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div>
        This is a Signup Page
        <h2 onClick={() => Router.push("/Login")}> Back to login</h2>
      </div>
    </div>
  );
};

export default Signup;