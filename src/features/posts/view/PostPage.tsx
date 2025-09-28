import { useState } from "react";
import { usePosts } from "../viewmodel/usePosts"


export default function PostPage() {
    const {data, isLoading, error, posts, postsStatus} = usePosts()

    const [form, setForm] = useState({title: "", content: ""});

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Ocurrió un error</p>;

    function handleCreatePost(e: React.FormEvent) {
        e.preventDefault();
        posts(form)
    }
  
    return (
        <div>
            {data?.map((post) => (
                <div key={post.id}>
                    {post.title}
                    {post.content}
                </div>
            ))}

            <div>

                <form onSubmit={handleCreatePost}>
                    <label htmlFor="title-post">Titulo</label>
                    <input 
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})} 
                    type="text" name="" id="title-post" />
                    <label htmlFor="">Content</label>
                    <input 
                    value={form.content}
                    onChange={(e) => setForm({...form, content: e.target.value})}
                    type="text" name=""  id="Content"/>
                    <button type="submit" disabled={postsStatus === "pending"}>
                        {postsStatus === "pending" ? "...": "Crear post"}
                    </button>
                </form>
            </div>
        </div>
    )
}
