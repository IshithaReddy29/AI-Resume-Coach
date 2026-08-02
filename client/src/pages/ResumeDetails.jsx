import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "../services/historyService";
import "../styles/ResumeDetails.css";
import { downloadReport } from "../services/pdfService";

function ResumeDetails() {

    const { id } = useParams();

    const [resume, setResume] = useState(null);

    useEffect(() => {

        fetchResume();

    }, []);

    const fetchResume = async () => {

        try {

            const data = await getResumeById(id);

            setResume(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!resume) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="details-container">

            <h1>{resume.fileName}</h1>

            <div className="details-card">

                <h2>ATS Score</h2>

                <h1>{resume.atsScore}</h1>

                <h2>Strengths</h2>

                <ul>

                    {resume.strengths.map((item, index) => (

                        <li key={index}>{item}</li>

                    ))}

                </ul>

                <h2>Weaknesses</h2>

                <ul>

                    {resume.weaknesses.map((item, index) => (

                        <li key={index}>{item}</li>

                    ))}

                </ul>

                <h2>Missing Skills</h2>

                <ul>

                    {resume.missingSkills.map((item, index) => (

                        <li key={index}>{item}</li>

                    ))}

                </ul>

                <h2>Suggestions</h2>

                <ul>

                    {resume.suggestions.map((item, index) => (

                        <li key={index}>{item}</li>

                    ))}

                </ul>

            </div>
            <button
    className="download-btn"
    onClick={() => downloadReport(resume)}
>
    Download PDF
</button>

        </div>

    );

}

export default ResumeDetails;