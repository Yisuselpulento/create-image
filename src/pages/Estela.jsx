import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"
import { FaTrash } from "react-icons/fa"

const Estela = () => {
  const { estelaData, setEstelaData } = useOutletContext()
  const [newName, setNewName] = useState("")

  // Cambiar valor de categoría
  const handleChange = (key, value) => {
    setEstelaData((prev) => ({ ...prev, [key]: Number(value) }))
  }

  // Agregar nueva categoría
  const handleAdd = () => {
    if (!newName.trim()) return
    setEstelaData((prev) => ({
      ...prev,
      [newName.trim()]: 50, // valor por defecto 50%
    }))
    setNewName("")
  }

  // Eliminar categoría
  const handleDelete = (key) => {
    const { [key]: _, ...rest } = estelaData
    setEstelaData(rest)
  }

  return (
    <div className="w-full max-w-md p-2">
      <h2 className="mb-4">Configuración</h2>

      {Object.keys(estelaData).map((key) => (
        <div key={key} className="mt-1">
          <div className="flex justify-between items-center ">
            <span className="capitalize text-white font-medium">{key}</span>
            <div className="flex items-center ">
              <span className="text-white text-xs">{estelaData[key]}%</span>
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
            value={estelaData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full accent-blue-800"
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

export default Estela