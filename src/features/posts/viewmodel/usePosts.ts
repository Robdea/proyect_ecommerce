import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllPosts, createPost} from "../../../services/posts"

export const usePosts = ()=> {
    const {data, isLoading, error} = useQuery({
        queryKey: ["posts"],
        queryFn: getAllPosts
    });

    const postMutation = useMutation({
       mutationFn:createPost,
       onSuccess: data => {
        console.log("post creado", data);
       }
    })

    return {
        data,
        isLoading, 
        error,
        posts: postMutation.mutate,
        postsStatus: postMutation.status,
        postsError: postMutation.error,
    }
}
