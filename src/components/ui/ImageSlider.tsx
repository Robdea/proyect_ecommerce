import { useState } from "react";
import { useNews } from "../../features/news/viewmodel/useNews";
import LeftIcon from "../../assets/Icons/LeftIcon";
import RightIcon from "../../assets/Icons/RightIcon";

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const { isLoading, news } = useNews();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ((news?.length) ?? 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => {
      const newsLength = news?.length ?? 1;
      return (prev - 1 + newsLength) % newsLength;
    });
  };

  if (isLoading) {
    return <p className="text-center">Cargando...</p>;
  }

  if (!news || news.length === 0) {
    return <p className="text-center">No hay noticias</p>;
  }

  return (
    <div className="relative w-full flex flex-col items-center ">
      
      <div className="flex relative w-full ">
        <div className="flex items-center justify-center w-full h-90">
            <img
                src={`${baseURL}${news[current].image_url}`}
                alt={news[current].title}
                className="w-full h-full object-cover rounded-2xl"
            />
        </div>
        <div className="flex flex-col absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-black/40 to-transparent z-20 text-white">
            <h2 className="text-3xl font-bold pl-5 py-5">{news[current].title}</h2>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <LeftIcon/>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <RightIcon/>
      </button>
      <div className="mt-4  flex items-start w-full">
        <p className="font-medium">{news[current].content}</p>
      </div>
      <div className="flex mt-4 space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
