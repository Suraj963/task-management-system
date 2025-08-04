import axios from "axios";
import { API_URI } from "../../../common/Components";
import { getHeaders } from "../../../Store";

const getAllData = async (data) => {
  const headers = await getHeaders();
  try {
    const response = await axios.get(`${API_URI}/tasks/getAllDetails`, {
      params: data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

const addData = async (data) => {
  const headers = await getHeaders();
  try {
    const response = await axios.post(`${API_URI}/tasks/`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

const updateData = async (data) => {
  try {
    const response = await axios.put(`${API_URI}/tasks/update`, data);
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

const deleteDataById = async (taskId) => {
  try {
    const response = await axios.delete(
      `${API_URI}/tasks/deleteById/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

const updateTaskStatus = async (data) => {
  try {
    const response = await axios.put(`${API_URI}/tasks/updateTaskStatus`, data);
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

export { addData, getAllData, updateData, deleteDataById, updateTaskStatus };
