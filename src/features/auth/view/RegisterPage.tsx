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
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='bg-white p-10'>
            <AuthForm
                handleSubmit={handleSubmit}
                textBttn='Registrarse'
                isLoading={registerStatus}
            >
                <div>
                    <h1 className='text-6xl font-medium'>Crea una cuenta</h1>
                </div>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    className='border border-gray-300 rounded-lg px-3 py-2'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className='border border-gray-300 rounded-lg px-3 py-2'
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    className='border border-gray-300 rounded-lg px-3 py-2'
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {registerStatus === "error" && <p>Error al registrar: {registerError?.message}</p>}
            </AuthForm>
        </div>
    </div>
  )
}
