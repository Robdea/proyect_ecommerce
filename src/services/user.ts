import { User } from "../lib/type";
import { api } from "./client"


interface Login {
    name: string,
    password: string
}

interface Register {
    email: string,
    password: string,
    name: string
}

const login = async ({name, password}: Login) =>{
    const formData = new URLSearchParams();

    formData.append("username", name);
    formData.append("password", password);

    const {data} = await api.post("auth/login", formData,{
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    return data
}

const registerUser = async ({email,password,name}: Register) => {
    const {data} = await api.post("user",{
        email,
        password,
        name,
        phone: "122",
        address: "sssssssssss"
    });
    return data
}

async function getMe() {
  const { data } = await api.get<User>("auth/me");
  console.log("Ejecutando getMe", data);
  return data;
}

export {registerUser, login, getMe}