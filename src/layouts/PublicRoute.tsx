import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/model/authStore"

export default function PublicRoute() {
    const {user} = useAuthStore()

    if (user) return <Navigate to="/" replace />;
    return <Outlet />;
}
