import { BrowserRouter, Route, Routes } from "react-router"
import RegisterPage from "./features/auth/view/RegisterPage"
import LoginPage from "./features/auth/view/LoginPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetails from "./features/products/view/ProductDetails"
import HomePage from "./pages/HomePage"
import DashBoard from "./pages/DashBoard"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
        </Route>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
