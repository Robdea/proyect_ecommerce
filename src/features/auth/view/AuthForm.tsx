import React from "react"


interface AuthFormpProps{
    handleSubmit: (e: React.FormEvent) => void,
    textBttn: string,
    children: React.ReactNode,
    isLoading: string
}

export default function AuthForm({children, handleSubmit, textBttn, isLoading}:AuthFormpProps) {
  return (

    <form onSubmit={handleSubmit}>
        {children}
      
      <button type="submit" disabled={isLoading === "loading"}>
        {isLoading === "loading" ? "..." : textBttn}
      </button>
    </form>
  )
}
