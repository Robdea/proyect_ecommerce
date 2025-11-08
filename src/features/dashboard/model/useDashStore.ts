import { create } from "zustand";
import { Category,Product } from "../../../lib/type";

interface DashState{
    selectedCategory: Category | null,
    selectedProduct: Product | null,
    setCategory: (cate: Category) => void,
    setProduct: (prod: Product) => void,
    clearCategory: () => void,
    clearProduct: () => void,
}

export const useDashStore = create<DashState>((set)=> ({
    selectedCategory: null,
    selectedProduct:null,
    setCategory: (cate) => set({selectedCategory: cate}),
    setProduct: (prod) => set({selectedProduct: prod}),
    clearCategory: () => set({selectedCategory: null}),
    clearProduct: () => set({selectedProduct: null}),
}))


