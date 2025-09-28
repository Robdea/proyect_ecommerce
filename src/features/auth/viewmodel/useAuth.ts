import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../model/authStore";


export function useAuth() {
    const {clearAuth, setAuth,token,user} = useAuthStore() 

}