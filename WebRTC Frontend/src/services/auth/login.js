import { base_url } from "../../constants/baseUrl"


export const loginCall = async (value) => {
  try{
    const response = await fetch(`${base_url}/user/login`,{
      method:"POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(value)
    })
    const data = await response.json();
    
    if (data.status){
      localStorage.setItem("token",data.data.token)
    }
    return data
  }
  catch(error){
    console.log("Error while calling login api",error?.message)
    throw new Error("Error while calling login api")
  }
}