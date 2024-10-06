import axios from "../utils/axiosInstance";

export async function verify(requestBody) {
  try {
    const req = await axios.post("/client/store-verification", requestBody);

    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
