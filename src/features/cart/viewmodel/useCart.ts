import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "../../../services/product";

export function useCart(ids: string[]) {
    const productsQuery = useQuery({
        queryKey: ["products_by_id"],
        queryFn: () => getProductsByIds(ids),
        enabled: !!ids
    })

    return {
        productsData: productsQuery.data,
        isLoading: productsQuery.isLoading,
        isError: productsQuery.isError,
    }
}
