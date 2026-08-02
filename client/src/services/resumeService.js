import axios from "axios";

const API = "${process.env.REACT_APP_API_URL}/resume";

export const uploadResume = async (file) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("resume", file);

    const response = await axios.post(
        `${API}/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};