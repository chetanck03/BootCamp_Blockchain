import axios from "axios"

export const uploadVoterImage = async(file)=>{
    const formData = new FormData()
    formData.append("file",file)

    const token  = localStorage.getItem("token");
    // Set headers with token for authentication
    const config = {
        headers: {
            'x-access-token': token
        }
    };
    
    const res = await axios.post("http://localhost:3000/api/postVoterImage",formData,config)
    console.log(res.data)


}