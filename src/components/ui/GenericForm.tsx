interface GenericFormProps {
    children: React.ReactNode;
    handleSubmit: (e: React.FormEvent) => void;
    textBttn: string;
    isLoading: boolean;
    className?: string;
}

export default function GenericForm({children,handleSubmit,isLoading,textBttn, className}:GenericFormProps) {
    return (
        <form
        onSubmit={handleSubmit}
        className={className ? className : "flex flex-col gap-2"}
        >
            {children}
            <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl mt-2 hover:bg-blue-600 cursor-pointer"
            type="submit">
                {isLoading ? "Cargando..." : textBttn}
            </button>
        </form>
    )
}
