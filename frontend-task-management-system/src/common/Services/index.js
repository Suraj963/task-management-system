import axios from "axios";
import { getHeaders } from "../../Store";
import { API_URI } from "../Components";

export const validateToken = async () => {
  const headers = await getHeaders();
  return axios.get(`${API_URI}/user/getProfile`, {
    headers,
  });
};
