import { base_url } from "../../constants/baseUrl";

export const getMeetInfo = async (value) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");
    const response = await fetch(`${base_url}/stream/get-stream-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while getting meet info", error?.message);
    throw new Error("Error while getting meet info");
  }
};
