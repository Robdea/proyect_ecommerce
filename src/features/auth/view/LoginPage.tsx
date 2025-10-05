import { useState } from 'react'
import AuthForm from './AuthForm'
import { useAuth } from '../viewmodel/useAuth';
import { Link } from 'react-router';

export default function LoginPage() {
  const {loginM, loginMError, loginMStatus} = useAuth()
  const [form, setForm] = useState({name: "", password: ""});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginM(form)
  }
    
    return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='bg-white p-10'>
          <AuthForm
            handleSubmit={handleSubmit}
            isLoading={loginMStatus}
            textBttn='Iniciar'
          >
            <div>
              <h1 className='text-6xl font-medium'>Inicia sesión</h1>
            </div>
            <input
              type="text"
              placeholder="Nombre de Usuario"
              className='border border-gray-300 rounded-lg px-3 py-2'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="password"
              className='border border-gray-300 rounded-lg px-3 py-2'
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {loginMStatus === "error" && <p>Error al registrar: {loginMError?.message}</p>}
          </AuthForm>
          <div className='mt-4 text-blue-700 font-medium'>
            <Link to="/register">Crea una cuenta</Link>
          </div>
        </div>
    </div>
  )
}
