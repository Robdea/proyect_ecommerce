import { useMutation, useQuery } from "@tanstack/react-query";
import { createNew, deleteNew, getNews, patchNew } from "../../../services/news";

export function useNews() {
    const news = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    });


    const newsMutation = useMutation({
        mutationFn: createNew,
        onSuccess: () => {
            news.refetch()
        }
    });

    const deleteNewMutation = useMutation({
        mutationFn: deleteNew,
        onSuccess: () => {
            news.refetch();
        }
    })
    
    const updateNewMutation = useMutation({
        mutationFn: patchNew,
        onSuccess: () => {
            news.refetch();
        }
    })
    

    return {
        news: news.data,
        isLoading: news.isLoading,
        error: news.error,
        //
        createN: newsMutation.mutate,
        isLoadingC: newsMutation.isPending,
        errorC: newsMutation.error,
        //delete
        deleteNew: deleteNewMutation.mutate,
        isLoadingD: deleteNewMutation.isPending,
        //update
        updateNew: updateNewMutation.mutate,
        isLoadingU: updateNewMutation.isPending
    }
}