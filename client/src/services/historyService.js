import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/resume`;

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