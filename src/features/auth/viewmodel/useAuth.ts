import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../model/authStore";
import { registerUser, login, getMe } from "../../../services/user";

export function useAuth() {
    const {setAuth, user, clearAuth} = useAuthStore() 

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
        // data puede ser solo { message: "Usuario creado" }
        console.log("Usuario registrado correctamente:", data.message);
        },
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setAuth(data.user)
        }
    })

    const getMeQuery = useQuery({
        queryKey: ["getMe"],
        queryFn: getMe,
        enabled: false,
        retry: false,
    });
    const checkAuth = async () => {
        try {
        const { data } = await getMeQuery.refetch();
        if (data) setAuth(data);
        } catch {
        clearAuth();
        }
    };

    return {
        register: registerMutation.mutate,
        registerStatus: registerMutation.status, 
        registerError: registerMutation.error,

        loginM: loginMutation.mutate,
        loginMStatus: loginMutation.status,
        loginMError: loginMutation.error,
        getMeQ: getMeQuery,
        checkAuth
    }
}