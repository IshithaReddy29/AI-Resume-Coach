import { useEffect, useState,useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { getLatestAnalysis,analyzeResume } from "../services/aiService";
import { uploadResume } from "../services/resumeService";
import {getAllResumes,deleteResume} from "../services/historyService";
import { useNavigate } from "react-router-dom";
import ATSChart from "../components/ATSChart";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

import "../styles/Dashboard.css";

function Dashboard(){

    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [resumes, setResumes] = useState([]);
    const [darkMode, setDarkMode] = useState(

    JSON.parse(localStorage.getItem("darkMode")) || false

);

useEffect(() => {

    localStorage.setItem(

        "darkMode",

        JSON.stringify(darkMode)

    );

}, [darkMode]);
    useEffect(() => {

    const fetchResumes = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/resume",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResumes(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    fetchResumes();

}, []);

const [analysis, setAnalysis] = useState(null);
const [highestScore, setHighestScore] = useState(0);
const [search, setSearch] = useState("");
const [averageScore, setAverageScore] = useState(0);

useEffect(() => {
    fetchAnalysis();
}, []);

const fetchAnalysis = async () => {

    try {

        const latest = await getLatestAnalysis();

        setAnalysis(latest);

        const history = await getAllResumes();

        setResumes(history);
        if (history.length > 0) {

    const highest = Math.max(
        ...history.map((resume) => resume.atsScore)
    );

    setHighestScore(highest);

}
if (history.length > 0) {

    const avg = Math.round(

        history.reduce(

            (sum, resume) =>

                sum + resume.atsScore,

            0

        ) / history.length

    );

    setAverageScore(avg);

}

    } catch (error) {

        console.log(error);

    }

};

const filteredResumes = resumes.filter((resume) =>
    resume.fileName
        .toLowerCase()
        .includes(search.toLowerCase())
);

const handleDelete = async (id) => {

    console.log("Deleting:", id);

    try {

        await deleteResume(id);

        alert("Delete API Success");

        await fetchAnalysis();

    } catch (error) {

        console.log(error);

        console.log(error.response?.status);
console.log(error.response?.data);

        alert("Delete API Failed");
    }

};

const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const handleUpload = async () => {

    if (!file) {

        alert("Please select a PDF.");

        return;

    }

    try {

        setUploading(true);
        const uploadedResume = await uploadResume(file);

        await analyzeResume(uploadedResume.resume._id);

        await fetchAnalysis();

        toast.success("Resume analyzed successfully");
         setFile(null);
          fileInputRef.current.value = "";


    } catch (error) {

        console.log(error);

    toast.error("Resume uploaded successfully.\n\nAI analysis is currently unavailable. Please try again later.");

    await fetchAnalysis();
    } finally {

       
        setUploading(false);

    }

};


return (

<div className="dashboard">

    <Sidebar />

    <div className={darkMode ? "main dark" : "main"}>
        <Navbar />

        <div className="stats">

            <StatCard
                title="ATS Score"
                value={analysis ? analysis.atsScore : 0}
            />

            <StatCard
title="Total Resumes"
value={resumes.length}
/>
            <StatCard
                title="Highest ATS Score"
                value={highestScore}
            />
            <StatCard
    title="Average ATS"
    value={averageScore}
/>

        </div>

        <div className="theme-toggle">

    <button
        onClick={() => setDarkMode(!darkMode)}
    >

        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}

    </button>

</div>

        <div className="upload">

            <h2>Upload your Resume</h2>

            <p>
                Upload your PDF resume and receive an AI-powered ATS score.
            </p>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button onClick={handleUpload} disabled={uploading}>

    {uploading ? (

        <RotatingLines
            visible={true}
            width="25"
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
        />

    ) : (

        "Upload Resume"

    )}

</button>

        </div>


        <div className="resume-list">

    <h2>Resume History</h2>

    <input
        className="search-box"
        type="text"
        placeholder="Search Resume..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <br /><br />

    <select
        className="sort-box"
        onChange={(e) => {

            const value = e.target.value;

            let sorted = [...resumes];

            if (value === "latest") {
                sorted.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            }

            if (value === "oldest") {
                sorted.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
            }

            if (value === "score") {
                sorted.sort(
                    (a, b) => b.atsScore - a.atsScore
                );
            }

            setResumes(sorted);

        }}
    >

        <option value="latest">Latest First</option>

        <option value="oldest">Oldest First</option>

        <option value="score">Highest ATS</option>

    </select>

    {

        filteredResumes.length === 0 ? (

            <div className="empty-state">

                <h2>📄 No Resume Found</h2>

                <p>
                    Upload your first resume to begin AI analysis.
                </p>

            </div>

        ) : (

            filteredResumes.map((resume) => (

                <div
                    key={resume._id}
                    className="resume-card"
                >

                    <h3>{resume.fileName}</h3>

                    <p>
                        <b>ATS Score:</b> {resume.atsScore}
                    </p>

                    <p>
                        <b>Uploaded:</b>{" "}
                        {new Date(resume.createdAt).toLocaleDateString()}
                    </p>

                    <div className="resume-actions">

                        <button
                            className="view-btn"
                            onClick={() => navigate(`/resume/${resume._id}`)}
                        >
                            View
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(resume._id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))

        )

    }

</div>
        <ATSChart resumes={resumes} />

    </div>

</div>

);
}

export default Dashboard;