import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const ImageThumb = ({ imageFile, setImageFile }) => {
  const [preview, setPreview] = useState(null);

  // Actualiza la preview cada vez que cambia imageFile
  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    // Limpieza al desmontar o cambiar imagen
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="inline-block px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded cursor-pointer text-white">
        {imageFile ? "Cambiar imagen" : "Seleccionar imagen"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setImageFile(file);
          }}
        />
      </label>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-16 w-16 object-cover rounded border border-zinc-600"
          />
          <button
            type="button"
            onClick={() => setImageFile(null)}
            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
          >
            <FaTrash size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageThumb;