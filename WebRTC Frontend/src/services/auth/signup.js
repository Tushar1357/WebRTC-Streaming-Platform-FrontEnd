import { base_url } from "../../constants/baseUrl"


export const signupCall = async (value) => {
  try{
    const response = await fetch(`${base_url}/user/sign-up`,{
      method:"POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(value)
    })
    const data = await response.json();
    
    return data
  }
  catch(error){
    console.log("Error while calling sign-up api",error?.message)
    throw new Error("Error while calling sign-up api")
  }
}