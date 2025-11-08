interface Product {
  name: string
  description: string
  price: number
  stock: number
  id: string
  image: File | string
  category?: Category | null
}

 interface Category {
    name: string,
    description: string,
    id: string,
    image: string
}

type Item = {
  id: string;
  quantity: number;
};

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface CreateCategory {
    name: string,
    description?: string,
    image?: File 
}

interface UpdateCategory {
    id: string,
    name: string,
    description?: string,
    image?: File 
}

interface CreateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  category_id?: string,
  image?: File
}

interface UpdateProduct extends  CreateProduct{
  id: stirng
} 

 interface News {
    id?: int,
    title: string,
    content: string,
    image_url?: File | null,
}

interface NewD {
    title: string,
    content: string,
    image_url?: File,
    id: number
}
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: string
}

interface Items {
  id: string,
  product_name: string,
  product_price: number,
  quantity: number,
  product: Product
}

export interface Transaction {
  total: number
  user_id: string
  id: string
  created_at: string
  items: [Items]
}

export {
    Product, Category,
    CartItem,
    CreateCategory,
    CreateProduct,
    News,
    User,
    NewD,
    Item,
    UpdateCategory,
    UpdateProduct
}