export interface Product {
  name: string
  description: string
  price: number
  stock: number
  id: string
  image: File | string
  category: Category
}

export interface Category {
    name: string,
    description: string,
    id: string,
    image: string
}
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
export interface CreateCategory {
    name: string,
    description?: string,
    image?: File 
}
export interface CreateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  category_id: string,
  image?: File
}

export interface News {
    title: string,
    content: string,
    image_url?: File,
}
