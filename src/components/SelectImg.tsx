import { useState } from "react";

interface SelectImgProps {
  onChange: (file: File) => void;
}

export default function SelectImg({onChange}:SelectImgProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        onChange(file);
        }
    };


    return (
      <div className="flex flex-col items-center gap-2">
      <label
        htmlFor="fileInput"
        className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl p-4 flex flex-col items-center justify-center hover:border-blue-500 transition"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full max-w-3xs max-h-30 rounded" />
        ) : (
          <span className="text-gray-500">Click aquí para seleccionar imagen</span>
        )}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" 
      />
    </div>
    );
}
