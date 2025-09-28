import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../model/authStore";
import { registerUser, login } from "../../../services/user";

export function useAuth() {
    const {setAuth} = useAuthStore() 

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

    return {
        register: registerMutation.mutate,
        registerStatus: registerMutation.status, 
        registerError: registerMutation.error,

        loginM: loginMutation.mutate,
        loginMStatus: loginMutation.status,
        loginMError: loginMutation.error,
    }
}