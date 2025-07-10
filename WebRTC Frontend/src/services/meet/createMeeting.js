import { base_url } from "../../constants/baseUrl";

export const createMeeting = async (value) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${base_url}/stream/create`, {
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
    console.log("Error while creating meeting", error?.message);
    throw new Error("Error while creating meeting");
  }
};
