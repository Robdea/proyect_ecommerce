import { api } from "./client";
import { Category, CreateCategory } from "../lib/type";

async function getAllCategories() {
    try{
        const {data} = await api.get<Category[]>("category");
        return data
    } catch(e) {
        console.error("Error fetching categories",e);
        return []
    }
}

async function createCategory({description, name, image}: CreateCategory) {
    try{
        const formData = new FormData();
        const data = { description, name};
        formData.append("data", JSON.stringify(data));

        if (image) {
            formData.append("image", image);
        }

        const {data: res} = await api.post("category", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return res
    }catch(e){
        console.error("Error to create new category", e);
        return null
    }
}

async function deleteCategory({id}:{id:string}) {
    try {
        const {data} = await api.delete(`category/${id}`)
        console.log("succes", data);
    } catch (error) {
        console.error("Error to delete category", error);
    }
}

async function getCategoryById() {
    
}

async function patchCategory() {
    
}

export{
    getAllCategories,
    getCategoryById,
    patchCategory,
    deleteCategory,
    createCategory
}



