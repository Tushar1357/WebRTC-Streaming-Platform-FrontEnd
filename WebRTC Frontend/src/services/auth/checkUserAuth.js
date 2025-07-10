import { base_url } from "../../constants/baseUrl";

export const checkToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { status: false, message: "No token found." };
    const response = await fetch(`${base_url}/user/check-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error while creating meeting", error?.message);
    throw new Error("Error while creating meeting");
  }
};
