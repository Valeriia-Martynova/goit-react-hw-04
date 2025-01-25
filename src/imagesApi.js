import axios from "axios";

const API_KEY = "5z2NCFe9Xkt2gpWNtBVpjMeVR34G2CyUUkdgXx5YT0g";
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: perPage,
      client_id: API_KEY,
    },
  });
  return response.data;
};
