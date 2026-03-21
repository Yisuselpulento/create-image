import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FaTrash } from "react-icons/fa"

const Longevidad = () => {
  const { longevidadData, setLongevidadData } = useOutletContext()
  const [newName, setNewName] = useState("")

  // Cambiar valor de categoría
  const handleChange = (key, value) => {
    setLongevidadData((prev) => ({ ...prev, [key]: Number(value) }))
  }

  // Agregar nueva categoría
  const handleAdd = () => {
    if (!newName.trim()) return
    setLongevidadData((prev) => ({
      ...prev,
      [newName.trim()]: 50, // valor por defecto 50%
    }))
    setNewName("")
  }

  // Eliminar categoría
  const handleDelete = (key) => {
    const { [key]: _, ...rest } = longevidadData
    setLongevidadData(rest)
  }

  return (
    <div className="w-full max-w-md p-2">
     <h2 className="mb-4">Configuración</h2>

      {Object.keys(longevidadData).map((key) => (
        <div key={key} className="mt-1">
          <div className="flex justify-between items-center">
            <span className="capitalize text-white ">{key}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-xs">{longevidadData[key]}%</span>
              <button
                onClick={() => handleDelete(key)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={longevidadData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full mt-1 accent-blue-800"
          />
        </div>
      ))}

      {/* AGREGAR NUEVA CATEGORÍA */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Nombre de nueva categoría"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-zinc-800 text-white outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-xs hover:bg-indigo-700 px-3 py-1 rounded"
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Longevidad