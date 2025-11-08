import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item } from "../../../lib/type";


interface CartState {
  products: Item[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  decreaseProduct: (productId: string) => void;
  increaseProduct: (productId: string) => void;
  clearCart: () => void;
  setProducts: (products: Item[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (productId) =>
        set((state) => {
          const existing = state.products.find(
            (p) => p.id === productId
          );

          if (existing) {
            return {
              products: state.products.map((p) =>
                p.id === productId
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              ),
            };
          } else {
            return {
              products: [...state.products, { id: productId, quantity: 1 }],
            };
          }
        }),

      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),

      decreaseProduct: (productId) =>
        set((state) => ({
          products: state.products
            .map((p) =>
              p.id === productId
                ? { ...p, quantity: p.quantity - 1 }
                : p
            )
            .filter((p) => p.quantity > 0),
        })),
        increaseProduct: (productId) =>{
            set((state) =>({
                products: state.products.map((p) =>
                 p.id === productId
                ? { ...p, quantity: p.quantity + 1 }
                : p
                )
            }))
        },
      clearCart: () => set({ products: [] }),

      setProducts: (products) => set({ products }),
    }),
    {
      name: "cart-storage", 
    }
  )
);
