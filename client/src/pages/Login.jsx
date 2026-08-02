import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import API from "../services/api";
import "../styles/Auth.css";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
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

            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

<div className="auth-container">

<div className="auth-card">

<h1>Welcome Back 👋</h1>

<p>Login to continue.</p>

<form onSubmit={handleSubmit}>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
/>

<span
onClick={() =>
setShowPassword(!showPassword)
}
>
{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}
</span>

</div>

<button type="submit">

Login

</button>

</form>

<div className="switch">

Don't have an account?

<Link to="/signup">

<span> Sign Up</span>

</Link>

</div>

</div>

</div>

    );

}

export default Login;