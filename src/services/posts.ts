import { api } from "./client"

interface Posts{
    title: string,
    content:  string 
}


interface Post {
  id: string
  title: string
  author_id: string
  content: string
  created_at: string
}


const createPost = async ({content, title}: Posts) => {
    const {data} = await api.post("posts", {
        title,
        content
    });

    return data
}


const getAllPosts = async (): Promise<Post[]> => {
    try {
        const {data} = await api.get<Post[]>("posts");
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export { createPost, getAllPosts}