import React from "react"


interface AuthFormpProps{
    handleSubmit: (e: React.FormEvent) => void,
    textBttn: string,
    children: React.ReactNode,
    isLoading: string
}

export default function AuthForm({children, handleSubmit, textBttn, isLoading}:AuthFormpProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {children}
      <button 
      className="bg-teal-500 rounded-2xl py-2"
      type="submit" disabled={isLoading === "loading"}>
        {isLoading === "loading" ? "..." : textBttn}
      </button>
    </form>
  )
}
