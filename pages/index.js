import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../redux/authActions";
import { checkLocally } from "../redux/checkLocally";

export default function Home() {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));    
    if (checkLocally(user)) {
      dispatch(loginSuccess());
    }
    if (!isAuthenticated) {
      Router.push("/Login");
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutSuccess());
  };

  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
