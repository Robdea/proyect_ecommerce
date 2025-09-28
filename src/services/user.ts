import { api } from "./client"


interface User{
    email: string, 
    password: string,
    name: string
}

interface Login {
    name: string,
    password: string
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

const registerUser = async ({email,password,name}: User) => {
    const {data} = await api.post("user",{
        email,
        password,
        name,
        phone: "122",
        address: "sssssssssss"
    });
    return data
}

export {registerUser, login}