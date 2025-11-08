import { api } from "./client";
import { Category, CreateCategory, UpdateCategory } from "../lib/type";

async function getAllCategories() {
    try{
        const {data} = await api.get<Category[]>("category");
        return data
    } catch(e) {
        console.error("Error fetching categories",e);
        return []
    }
}

async function patchCategory({name,description,image, id}:UpdateCategory) {
    try {
        console.log("example of patch");
        const formData = new FormData();
        const data = { description, name};
        formData.append("data", JSON.stringify(data));

        if (image instanceof File) {
            formData.append("image", image);
        }
        console.log([...formData.entries()]);
        const {data: res} = await api.patch(`category/${id}`, formData)
        console.log("Creación de categoria",res);
        return res
            
   } catch (error) {
        console.error(error);
        return null
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
        console.log("Creación de categoria",res);
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

export{
    getAllCategories,
    deleteCategory,
    createCategory,
    patchCategory
}



