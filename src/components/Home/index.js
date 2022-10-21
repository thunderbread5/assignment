import React, { useEffect } from "react";
import "./index.css";
import nusLogo from "../../nus_logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="home">
      <img src={nusLogo} alt="NUS logo" className="nus-logo"></img>
      <h1>NUS is a leading research university in Asia.</h1>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}
