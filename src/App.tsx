import { BrowserRouter, Route, Routes } from "react-router"
import RegisterPage from "./features/auth/view/RegisterPage"
import LoginPage from "./features/auth/view/LoginPage"
import PostPage from "./features/posts/view/PostPage"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/posts" element={<PostPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
