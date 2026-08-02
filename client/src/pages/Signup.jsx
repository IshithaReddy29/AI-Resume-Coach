import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "../styles/Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/signup", form);

      toast.success(res.data.message);

      setTimeout(() => {

        navigate("/");

      },1500);

    }

    catch(error){

      toast.error(error.response?.data?.message || "Signup Failed");

    }

  };

  return(

<div className="auth-container">

<div className="auth-card">

<h1>Create Account</h1>

<p>Start improving your resume with AI.</p>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
/>

<button type="submit">

Create Account

</button>

</form>

<div className="switch">

Already have an account?

<Link to="/">

<span> Login</span>

</Link>

</div>

</div>

</div>

);

}

export default Signup;