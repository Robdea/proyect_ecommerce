import {  CreateProduct, Product } from "../lib/type"
import { api } from "./client";



async function getAllProducts() {
    try {
        const {data} = await api.get<Product[]>("product");
        return data
    } catch (error) {
        console.error("Error fetching products", error);
        return []
    }
}

async function createProduct({ category_id, description, name, price, stock, image }: CreateProduct ) {
  try {
    const formData = new FormData();

    // Los demás campos los convertimos a JSON y los agregamos como un campo "data"
    const data = { category_id, description, name, price, stock };
    formData.append("data", JSON.stringify(data));

    // Imagen opcional
    if (image) {
      formData.append("image", image);
    }

    const { data: response } = await api.post("product", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response;
  } catch (error) {
    console.error("Error creating product", error);
    return null;
  }
}

async function getProductById({id}:{id:string}) {
   try {
        const {data} = await api.get<Product>(`product/${id}`);
        return data
    } catch (error) {
        console.error("Error fetching products", error);
        return null
    }  
}

async function getProductsByCategory({categoryId}:{categoryId:string}) {
    try {
        console.log("Ejecutar");
        const {data} = await api.get<Product[]>(`product/by-category/${categoryId}`);
        
        return data
    } catch (error) {
        console.error("Error fetching products", error);
        return []
    }
}

async function deleteProduct({id}:{id:string}) {
    try {
        const {data} = await api.delete(`product/${id}`)
        console.log("succes", data);
    } catch (error) {
        console.error("Error to delete category", error);
    }
}

export{
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct,
    getProductsByCategory
}
