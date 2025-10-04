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
              <h1 className='text-6xl font-medium'>TeckMex</h1>
            </div>
            <h3>Inicia sesión</h3>
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {loginMStatus === "error" && <p>Error al registrar: {loginMError?.message}</p>}
          </AuthForm>
          <div className='mt-4'>
            <Link to="/register">Crea una cuenta</Link>
          </div>
        </div>
    </div>
  )
}
