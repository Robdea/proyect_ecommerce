import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    products: CartItem[];
    addProduct: (product: CartItem) => void;
    removeProduct: (productId: string) => void;
    setProducts: (products: CartItem) => void;   
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            products: [],
            addProduct: (product) => 
                set((state) => ({ 
                    products: [...state.products, product] 
                })),
            removeProduct: (productId) => 
                set((state) => ({ 
                    products: state.products.filter(p => p.id !== productId) 
                })),
            setProducts: (products) => 
                set({ products: [products] }),
        }),
        {
            name: 'cart-storage', // unique name for localStorage key
        }
    )
);