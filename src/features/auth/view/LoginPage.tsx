import { useState } from 'react'
import AuthForm from './AuthForm'
import { useAuth } from '../viewmodel/useAuth';

export default function LoginPage() {
  const {loginM, loginMError, loginMStatus} = useAuth()
  const [form, setForm] = useState({name: "", password: ""});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginM(form)
  }
    
    return (
    <div>
        <AuthForm
          handleSubmit={handleSubmit}
          isLoading={loginMStatus}
          textBttn='Iniciar'
        >
          <input
            type="text"
            placeholder="Username"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {loginMStatus === "error" && <p>Error al registrar: {loginMError?.message}</p>}
        </AuthForm>
    </div>
  )
}
