interface GenericCardProps{
    name: string,
    img: string | File,
    children: React.ReactNode
}
export default function GenericCard({children,img,name}: GenericCardProps) {
    
    const baseURL = import.meta.env.VITE_BASE_URL
    
    return (
        <div className="relative border-2 w-50 h-full border-gray-200 rounded-2xl p-4 ">
            <div className="flex flex-col gap-4 items-center">
                <img className="w-full h-40 object-cover" src={`${baseURL}${img}`} alt="" />
                <p className="font-medium">{name}</p>
            </div>
            <div className="absolute top-2 right-2">
                {children}
            </div>
        </div>
    )
}
