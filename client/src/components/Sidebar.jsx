import {
    FaChartPie,
    FaFileAlt,
    FaUpload,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2>Resume Coach</h2>

            <div className="menu">

                <button onClick={() => navigate("/dashboard")}>
                    <FaChartPie /> Dashboard
                </button>

                <button onClick={() => navigate("/dashboard")}>
                    <FaFileAlt /> My Resumes
                </button>

                <button onClick={() => navigate("/dashboard")}>
                    <FaUpload /> Upload Resume
                </button>

                

                <button onClick={() => navigate("/profile")}>
                    <FaUser /> Profile
                </button>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt /> Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;