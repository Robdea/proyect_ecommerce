import { NewD, News } from "../lib/type";
import { api } from "./client";

const getNews = async () => {
    try {
        const {data} = await api.get<NewD[]>("news");
        console.log(data);
        return data 
    } catch (error) {
        console.error(error);
    }
}

const patchNew = async ({content, id, title, image_url}: News) => {
    try {
        const formData = new FormData();
        
        const data = {content, title};
        formData.append("data", JSON.stringify(data));

        if (image_url instanceof File) {
            formData.append("image_url", image_url);
        }

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const {data: res} = await api.patch(`news/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Respuesta de update", res);
        return res;
    } catch (error) {
        console.error("Error en patchNew", error);
        return null;
    }
}

const deleteNew = async ({id}:{id:number}) => {
    const {data} = await api.delete(`news/${id}`);
    console.log("success", data);
}

const createNew = async ({content,title,image_url}: News) => {
    try {
        const formData = new FormData();
        
        const data = {content, title};
        
        formData.append("data", JSON.stringify(data));

        if (image_url) {
            formData.append("image", image_url);
        }

        const {data: res} = await api.post("news", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return res 
    } catch (error) {
        console.error(error);
    }
}

export {getNews, createNew, patchNew, deleteNew}