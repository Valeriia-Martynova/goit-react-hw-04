import axios from "axios";

const API_KEY = "5z2NCFe9Xkt2gpWNtBVpjMeVR34G2CyUUkdgXx5YT0g";
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 0, perPage = 12) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};
