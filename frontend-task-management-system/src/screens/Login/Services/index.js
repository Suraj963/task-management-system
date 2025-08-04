import axios from "axios";
import { API_URI } from "../../../common/Components";

const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/user/signUp`, data);
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/user/`, data);
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

export { signUp, loginUser };
