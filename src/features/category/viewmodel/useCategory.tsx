import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, deleteCategory, getAllCategories } from "../../../services/category";

export function useCategory() {
  // Query hook for fetching all categories
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  // Mutation hook for creating a category
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Invalidate and refetch categories after creation
      categoriesQuery.refetch();
    }
  });

  // Mutation hook for deleting a category
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch categories after deletion
      categoriesQuery.refetch();
    }
  });

  return {
    // Categories query
    categories: categoriesQuery.data,
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,

    // Create category mutation
    createCategory: createCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    createError: createCategoryMutation.error,

    // Delete category mutation
    deleteCategory: deleteCategoryMutation.mutate,
    isDeleting: deleteCategoryMutation.isPending,
    deleteError: deleteCategoryMutation.error,
  };
}