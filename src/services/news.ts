import { News } from "../lib/type";
import { api } from "./client";


const getNews = async () => {
    try {
        const {data} = await api.get<News[]>("news");
        console.log(data);
        return data 
    } catch (error) {
        console.error(error);
    }
}

export {getNews}