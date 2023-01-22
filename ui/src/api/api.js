import axios from "axios";

export async function axiosGetTime(endpoint) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function axiosGetMetrics(endpoint) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_METRICS_PORT}${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
