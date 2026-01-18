import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

// Option 1 : Avec Axios
export const fetchTodosAxios = async () => {
    try {
        const response = await axios.get(`${API_URL}/todos?_limit=10`);
        return response.data;
    } catch (error) {
        throw new Error("Erreur Axios");
    }
};

