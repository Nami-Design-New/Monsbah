import axios from "axios";

export async function addAd(requestBody) {
  try {
    const req = await axios.post(
      "https://monsbahapi.monsbah.com/api/prods_add",
      requestBody
    );

    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
