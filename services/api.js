import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchTodosAxios = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos?_limit=10`);
    return response.data;
  } catch (error) {
    console.error("Erreur Axios", error);
    throw error;
  }
};