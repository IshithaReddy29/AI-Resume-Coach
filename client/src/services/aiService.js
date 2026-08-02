import axios from "axios";

const API = "${process.env.REACT_APP_API_URL}/api/ai";

export const getLatestAnalysis = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/latest`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};
export const analyzeResume = async (resumeId) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API}/analyze/${resumeId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};