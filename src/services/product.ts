import {  CreateProduct, Product, UpdateProduct } from "../lib/type"
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

async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  const query = ids.map((id) => `ids=${encodeURIComponent(id)}`).join("&");
  const { data } = await api.get<Product[]>(`product/by_ids?${query}`);
  return data;
}

async function patchProduct({category_id,description,id,image,name,price,stock}:UpdateProduct) {
  try {
    const formData = new FormData();

    const data = { category_id, description, name, price, stock };
    formData.append("data", JSON.stringify(data));
    
    if (image instanceof File) {
      formData.append("image", image);
    }

    const { data: response } = await api.patch(`product/${id}`, formData);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function createProduct({ category_id, description, name, price, stock, image }: CreateProduct ) {
  try {
    const formData = new FormData();

    const data = { category_id, description, name, price, stock };
    formData.append("data", JSON.stringify(data));
    
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
    getProductsByCategory,
    getProductsByIds,
    patchProduct
}
