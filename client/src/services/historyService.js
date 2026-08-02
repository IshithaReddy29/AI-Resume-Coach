import axios from "axios";

const API = "http://localhost:5000/api/resume";

export const getAllResumes = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(API, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

};

export const deleteResume = async (id) => {

    const token = localStorage.getItem("token");

    const response=await axios.delete(`${API}/${id}`, {

        headers: {

            Authorization: `Bearer ${token}`

        }
        
    });
    return response.data;
};

export const getResumeById = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(`${API}/${id}`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

};