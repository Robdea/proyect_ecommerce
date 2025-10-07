import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/model/authStore";


export default function ProtectedRoute() {
    const { user, loading } = useAuthStore();

    if (loading) return <div>Cargando...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />; 
}
