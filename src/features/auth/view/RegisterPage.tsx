import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { useAuth } from '../viewmodel/useAuth';

export default function RegisterPage() {
    const {register, registerError,registerStatus} = useAuth();
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(form);
    };

    return (
    <div>
        <AuthForm
            handleSubmit={handleSubmit}
            textBttn='Registrarse'
            isLoading={registerStatus}
        >
            <input
                type="text"
                placeholder="Username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {registerStatus === "error" && <p>Error al registrar: {registerError?.message}</p>}
        </AuthForm>
    </div>
  )
}
