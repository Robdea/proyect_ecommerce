import React from "react"


interface AuthFormpProps{
    handleSubmit: () => void,
    textBttn: string,
    children: React.ReactNode
}

export default function AuthForm({children, handleSubmit, textBttn}:AuthFormpProps) {
  return (

    <form onSubmit={handleSubmit}>
        {children}
        <button type="submit">{textBttn}</button>
    </form>
  )
}
