import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Title,

    Tooltip,

    Legend

} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Title,

    Tooltip,

    Legend

);

function ATSChart({ resumes }) {

    const data = {

        labels: resumes.map((resume) =>

            resume.fileName

        ),

        datasets: [

            {

                label: "ATS Score",

                data: resumes.map((resume) =>

                    resume.atsScore

                ),

                borderColor: "#4f46e5",

                backgroundColor: "#4f46e5",

                tension: 0.4

            }

        ]

    };

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "30px"
            }}
        >

            <Line data={data} />

        </div>

    );

}

export default ATSChart;