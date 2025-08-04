import axios from "axios";
import { API_URI } from "../../../common/Components";
import { getHeaders } from "../../../Store";

const getTasksCount = async () => {
  const headers = await getHeaders();
  try {
    const response = await axios.get(`${API_URI}/tasks/getTasksCount`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log("API Error :", error.response?.data || error.message);
    console.log("API Error:", error);
    throw error;
  }
};

export { getTasksCount };
