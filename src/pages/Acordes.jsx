import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ImageThumb from "../components/ImageThumb"; // Ajusta la ruta según tu proyecto

const Acordes = () => {
  const { acordesData, setAcordesData } = useOutletContext();

  // Estado local para inputs temporales
  const [acordeName, setAcordeName] = useState("");
  const [acordePercentage, setAcordePercentage] = useState(50);
  const [acordeColor, setAcordeColor] = useState("#4ade80");
  const [acordeImage, setAcordeImage] = useState(null);

  // Guardar nombre del perfume dentro de data
  const handlePerfumeChange = (e) => {
    setAcordesData((prev) => ({
      ...prev,
      perfume: e.target.value,
    }));
  };

  // Agregar nuevo acorde
  const handleAddAcorde = () => {
    if (!acordeName) return;

    const newAcorde = {
      name: acordeName,
      percentage: acordePercentage,
      color: acordeColor,
      image: acordeImage ? URL.createObjectURL(acordeImage) : null,
    };

    setAcordesData((prev) => ({
      ...prev,
      acordes: [...(prev.acordes || []), newAcorde],
    }));

    // Limpiar inputs
    setAcordeName("");
    setAcordePercentage(50);
    setAcordeColor("#4ade80");
    setAcordeImage(null);
  };

  // Eliminar acorde
  const handleRemoveAcorde = (index) => {
    setAcordesData((prev) => ({
      ...prev,
      acordes: prev.acordes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-2 text-white bg-stone-950 min-h-screen">
      <h2 className="mb-4">Configuración</h2>

      {/* Nombre del perfume */}
      <div className="mb-4">
        <label className="block mb-1 text-sm">Nombre del perfume:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-stone-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
          value={acordesData.perfume || ""}
          onChange={handlePerfumeChange}
          placeholder="Ej: Bad Boy Le Parfum"
        />
      </div>

      {/* Formulario de acordes */}
      <div className="mb-4 border-t border-zinc-700 pt-4">
        <h2 className="text-sm mb-2">Agregar acorde</h2>
        <input
          type="text"
          placeholder="Nombre del acorde"
          className="p-2 rounded text-white bg-stone-800 placeholder:text-zinc-400 mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
          value={acordeName}
          onChange={(e) => setAcordeName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          className="p-2 rounded text-white bg-stone-800 placeholder:text-zinc-400 mr-2 mb-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-800"
          value={acordePercentage}
          onChange={(e) => setAcordePercentage(Number(e.target.value))}
        />
        <input
          type="color"
          className="p-1 rounded mr-2 mb-2 border border-zinc-700 cursor-pointer"
          value={acordeColor}
          onChange={(e) => setAcordeColor(e.target.value)}
        />

        {/* ImageThumb para seleccionar y previsualizar imagen */}
        <ImageThumb imageFile={acordeImage} setImageFile={setAcordeImage} />

        <button
          onClick={handleAddAcorde}
          className="bg-indigo-700 px-3 py-2 rounded hover:bg-indigo-800 mt-2"
        >
          Agregar
        </button>
      </div>

      {/* Lista de acordes */}
      <div>
        <h2 className="mb-2">Acordes agregados</h2>
        {(!acordesData.acordes || acordesData.acordes.length === 0) && (
          <p className="text-sm text-zinc-400">No hay acordes agregados</p>
        )}
        {acordesData.acordes?.map((acorde, i) => (
          <div key={i} className="flex items-center mb-2 gap-2">
            <div className="w-40">{acorde.name}</div>
            <div
              className="flex-1 h-4 rounded"
              style={{ background: acorde.color, width: `${acorde.percentage}%` }}
            ></div>
            {acorde.image && (
              <img
                src={acorde.image}
                alt={acorde.name}
                className="h-8 w-8 object-cover rounded"
              />
            )}
            <div>{acorde.percentage}%</div>
            <button
              onClick={() => handleRemoveAcorde(i)}
              className="ml-2 px-2 py-1 bg-red-600 rounded text-xs hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acordes;