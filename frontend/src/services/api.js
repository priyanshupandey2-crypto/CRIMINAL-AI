import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:8000",

    headers:{
        "Content-Type":"application/json"
    }

});

export const chatWithAI = async(message)=>{

    return api.post("/chat",{

        message:message

    });

}

export default api;