import CategoryCard from "../../../components/CategoryCard";
import { useCategory } from "../viewmodel/useCategory";

export default function Category() {
    const {categories,isLoading} = useCategory()
    if (isLoading) return <div>Cargando</div>

    return (
        <div className="flex flex-col px-5 my-10">
            <h2 className="text-2xl">Categorias</h2>
            <div className="flex flex-wrap gap-4 p-4">
                {categories && categories.map(category => (
                    <CategoryCard key={category.id} {...category} />
                ))}
            </div>
        </div>
    )
}
