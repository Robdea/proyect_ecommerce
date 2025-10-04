import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../services/news";

export function useNews() {
    const news = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    });

    return {
        news: news.data,
        isLoading: news.isLoading,
        error: news.error,
    }
}