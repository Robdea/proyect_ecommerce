import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProducts } from "../../../services/product";

export function useProduct() {
  // Query hook for fetching all products
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  // Mutation hook for creating a product
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch products after creation
      productsQuery.refetch();
    }
  });

  // Mutation hook for deleting a product
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate and refetch products after deletion
      productsQuery.refetch();
    }
  });

  return {
    // Products query
    products: productsQuery.data,
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,

    // Create product mutation
    createProduct: createProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    createError: createProductMutation.error,

    // Delete product mutation
    deleteProduct: deleteProductMutation.mutate,
    isDeleting: deleteProductMutation.isPending,
    deleteError: deleteProductMutation.error,
  };
}