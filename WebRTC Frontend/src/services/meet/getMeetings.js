import { base_url } from "../../constants/baseUrl";

export const getMeetings = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${base_url}/stream/get-streams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while getting meetings", error?.message);
    throw new Error("Error while getting meetings");
  }
};
