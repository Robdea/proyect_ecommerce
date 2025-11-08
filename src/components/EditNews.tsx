import {useState} from 'react'
import { useNews } from '../features/news/viewmodel/useNews';
import type { News } from '../lib/type';
import TrashIcon from '../assets/Icons/TrashIcon';

export default function EditNews() {
  const {news, isLoading, deleteNew,updateNew, isLoadingU} = useNews();
  
  // Inicializa con undefined hasta que se seleccione una noticia
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(""); // String para la URL de preview
  const [imageFile, setImageFile] = useState<File | null>(null); // File real para enviar


  const handleNewsSelect = ({news}: {news: News}) => {
    setSelectedNews(news);
    setEditedTitle(news.title);
    setEditedContent(news.content);
    
    // Si image_url es un File (nuevo), crear preview
    if (news.image_url instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(news.image_url);
    } else {
      // Si es string (URL del backend), usarla directamente
      const baseURL = import.meta.env.VITE_BASE_URL;
      setImagePreview(`${baseURL}${news.image_url}`);
    }
    
    setImageFile(null); // Resetear el archivo nuevo
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Guarda el archivo real
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Preview en base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Guardando cambios:', {
      id: selectedNews?.id,
      title: editedTitle,
      content: editedContent,
      image: imageFile || selectedNews?.image_url // Usa el nuevo archivo o mantén el anterior
    });
    if(selectedNews !== null){
      updateNew({
        id: selectedNews.id,
        content: editedContent,
        title: editedTitle,
        image_url: imageFile,
      });

    }
    // Aquí llamarías a tu hook de React Query para actualizar
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta novedad?')) {
      console.log('Eliminando novedad:', selectedNews?.id);
      if(selectedNews !== null){
        deleteNew({id: selectedNews.id});
        setSelectedNews(null)
      }
    }
  };

  const baseURL = import.meta.env.VITE_BASE_URL;

  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }

  // Si no hay noticia seleccionada, mostrar mensaje
  if (!selectedNews) {
    return (
      <div className="flex bg-gray-50 overflow-y-scroll">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Selecciona una novedad para editar</p>
        </div>
        
        {/* Panel lateral - Lista de novedades */}
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Novedades</h2>
          <div className="space-y-3">
            {news?.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNewsSelect({news: n})}
                className="w-full rounded-lg overflow-hidden transition transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <img
                  src={`${baseURL}${n.image_url}`}
                  alt={n.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {n.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Panel principal - Editor */}
      <div className="flex-3 overflow-y-auto h-150 p-6 ">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Editar Novedad</h1>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {
                  isLoadingU ? "Cargando...": 
                  "Guardar"
                }
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 p-2 bg-red-700/70 text-white rounded-full hover:bg-red-700 transition"
                title='Eliminar'
              >
                <TrashIcon/>
              </button>
            </div>
          </div>

          {/* Imagen */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen de la novedad
            </label>
            <div className="relative group">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
              <label className="absolute inset-0 flex i
              tems-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-lg">
                <span className="text-white font-medium">Cambiar imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Título */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Título de la novedad"
            />
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full 
              px-4 py-2 border border-gray-300 
              rounded-lg focus:ring-2 focus:ring-blue-500 
              focus:border-transparent resize-none"
              placeholder="Contenido de la novedad"
            />
          </div>
        </div>
      </div>

      {/* Panel lateral - Lista de novedades */}
      <div className="flex-1 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Novedades</h2>
        <div className="space-y-3">
          {news?.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNewsSelect({news: n})}
              className={`w-full rounded-lg overflow-hidden transition transform hover:scale-105 ${
                selectedNews.id === n.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'shadow-md hover:shadow-lg'
              }`}
            >
              <img
                src={`${baseURL}${n.image_url}`}
                alt={n.title}
                className="w-full h-30 object-cover"
              />
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {n.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}