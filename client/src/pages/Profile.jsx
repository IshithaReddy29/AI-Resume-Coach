import { useEffect, useState } from "react";
import { getAllResumes } from "../services/historyService";
import "../styles/Profile.css";

function Profile() {

    const [resumes, setResumes] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const data = await getAllResumes();

            setResumes(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const user = JSON.parse(localStorage.getItem("user"));

    const highest = resumes.length
        ? Math.max(...resumes.map(r => r.atsScore))
        : 0;

    const average = resumes.length
        ? Math.round(
            resumes.reduce((a, b) => a + b.atsScore, 0) /
            resumes.length
        )
        : 0;

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>👤 Profile</h1>

                <h2>{user?.name}</h2>

                <p>{user?.email}</p>

                <hr />

                <h3>Total Resumes</h3>

                <p>{resumes.length}</p>

                <h3>Highest ATS</h3>

                <p>{highest}</p>

                <h3>Average ATS</h3>

                <p>{average}</p>

            </div>

        </div>

    );

}

export default Profile;