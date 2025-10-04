import {  getProductById, getProductsByCategory } from "../../../services/product";
import { useQuery } from "@tanstack/react-query";


export function useProductQuery(id: string) {
  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id }),
    enabled: !!id,
  });


  return {
    product: productQuery.data,
    isLoading: productQuery.isLoading,
  }
}

export function useProductsByCategoryQuery(categoryId: string) {
  const productByCategoryQuery = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProductsByCategory({ categoryId }),
    enabled: !!categoryId,
  });

  return {
    products: productByCategoryQuery.data,
    isLoadingCactegories: productByCategoryQuery.isLoading
  }
}