interface Product {
  name: string
  description: string
  price: number
  stock: number
  id: string
  image: File | string
  category: Category
}

 interface Category {
    name: string,
    description: string,
    id: string,
    image: string
}
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
 interface CreateCategory {
    name: string,
    description?: string,
    image?: File 
}
 interface CreateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  category_id: string,
  image?: File
}

 interface News {
    title: string,
    content: string,
    image_url?: File,
}
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: string
}


export {
    Product, Category,
    CartItem,
    CreateCategory,
    CreateProduct,
    News,
    User
}