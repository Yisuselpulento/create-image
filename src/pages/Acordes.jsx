import { useState } from "react"
import { useOutletContext } from "react-router-dom"

const Acordes = () => {
  const { acordesData, setAcordesData, perfumeName, setPerfumeName } = useOutletContext()

  const [acordeName, setAcordeName] = useState("")
  const [acordePercentage, setAcordePercentage] = useState(50)
  const [acordeColor, setAcordeColor] = useState("#4ade80")
  const [acordeImage, setAcordeImage] = useState(null)

  const handleAddAcorde = () => {
    if (!acordeName) return
    const newAcorde = {
      name: acordeName,
      percentage: acordePercentage,
      color: acordeColor,
      image: acordeImage ? URL.createObjectURL(acordeImage) : null,
    }
    setAcordesData([...acordesData, newAcorde])

    // Limpiar campos
    setAcordeName("")
    setAcordePercentage(50)
    setAcordeColor("#4ade80")
    setAcordeImage(null)
  }

  const handleRemoveAcorde = (index) => {
    const updated = acordesData.filter((_, i) => i !== index)
    setAcordesData(updated)
  }

  return (
    <div className="p-4 text-white bg-stone-950 min-h-screen">
      <h1 className="text-2xl mb-4">Acordes principales</h1>

      {/* PERFUME */}
      <div className="mb-4">
        <label className="block mb-1">Nombre del perfume:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-stone-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={perfumeName}
          onChange={(e) => setPerfumeName(e.target.value)}
          placeholder="Ej: Bad Boy Le Parfum"
        />
      </div>

      {/* FORMULARIO DE ACORDES */}
      <div className="mb-4 border-t border-zinc-700 pt-4">
        <h2 className="text-xl mb-2">Agregar acorde</h2>
        <input
          type="text"
          placeholder="Nombre del acorde"
          className="p-2 rounded text-white bg-stone-800 placeholder:text-zinc-400 mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={acordeName}
          onChange={(e) => setAcordeName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          className="p-2 rounded text-white bg-stone-800 placeholder:text-zinc-400 mr-2 mb-2 w-20 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={acordePercentage}
          onChange={(e) => setAcordePercentage(Number(e.target.value))}
        />
        <input
          type="color"
          className="p-1 rounded mr-2 mb-2 border border-zinc-700 cursor-pointer"
          value={acordeColor}
          onChange={(e) => setAcordeColor(e.target.value)}
        />

        {/* INPUT FILE COMO BOTÓN */}
        <label
          className="inline-block mr-2 mb-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded cursor-pointer text-white"
        >
          {acordeImage ? "Imagen seleccionada" : "Seleccionar imagen"}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAcordeImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          onClick={handleAddAcorde}
          className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800"
        >
          Agregar
        </button>
      </div>

      {/* LISTA DE ACORDES */}
      <div>
        <h2 className="text-xl mb-2">Acordes agregados</h2>
        {acordesData.length === 0 && (
          <p className="text-sm text-zinc-400">No hay acordes agregados</p>
        )}
        {acordesData.map((acorde, i) => (
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
  )
}

export default Acordes