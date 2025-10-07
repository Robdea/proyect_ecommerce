import { BrowserRouter, Route, Routes } from "react-router"
import RegisterPage from "./features/auth/view/RegisterPage"
import LoginPage from "./features/auth/view/LoginPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetails from "./features/products/view/ProductDetails"
import HomePage from "./pages/HomePage"
import DashBoard from "./pages/DashBoard"
import ProtectedRoute from "./layouts/ProtectedRoute"
import PublicRoute from "./layouts/PublicRoute"
import { useAuth } from "./features/auth/viewmodel/useAuth"
import { useEffect } from "react"
import { useAuthStore } from "./features/auth/model/authStore"

function App() {
  const {checkAuth} = useAuth();
  const {setLoading} = useAuthStore()
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };
    console.log("get me app");
    initAuth();
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainLayout/>}>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route index element={<HomePage/>}/>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
        
        <Route element={<PublicRoute/>}>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
