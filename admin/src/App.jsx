import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import { ToastContainer } from 'react-toastify';

const demoCredentials = { email: "admin@quickfood.local", password: "QuickFood@2026" };

const App = () => {
  const url ='http://localhost:4000'
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const fillDemoCredentials = () => { setCredentials(demoCredentials); setError(""); };
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`, credentials);
      if (!response.data.success) throw new Error(response.data.message || "Unable to sign in");
      const role = JSON.parse(atob(response.data.token.split(".")[1])).role;
      if (role !== "admin") throw new Error("Administrator account required");
      localStorage.setItem("adminToken", response.data.token); setToken(response.data.token);
    } catch (loginError) { setError(loginError.message || "Unable to sign in"); }
  };
  if (!token) return <main className="admin-login-page"><form className="admin-login" onSubmit={login}><span className="admin-eyebrow">QUICKFOOD MANAGEMENT</span><h2>Welcome back</h2><p>Sign in to manage your menu and stay on top of incoming orders.</p><label>Email address<input type="email" value={credentials.email} placeholder="admin@quickfood.local" required onChange={(e) => setCredentials({...credentials,email:e.target.value})}/></label><label>Password<input type="password" value={credentials.password} placeholder="Enter your password" required onChange={(e) => setCredentials({...credentials,password:e.target.value})}/></label><button type="submit">Sign in to dashboard</button>{error && <p className="login-error">{error}</p>}<div className="demo-credentials"><div><strong>Local demo account</strong><span>{demoCredentials.email}</span><span>{demoCredentials.password}</span></div><button type="button" onClick={fillDemoCredentials}>Use demo account</button></div></form></main>;
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />

      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} token={token}/>} />
          <Route path="/" element={<Add url={url} token={token}/>} />
          <Route path="/list" element={<List url={url} token={token}/>} />
          <Route path="/orders" element={<Orders url={url} token={token}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
