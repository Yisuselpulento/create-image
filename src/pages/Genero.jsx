import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"
import { FaTrash } from "react-icons/fa"

const Genero = () => {
  const { generoData, setGeneroData, percepcionGenero, setPercepcionGenero } = useOutletContext()
  const [newName, setNewName] = useState("")

  // Cambiar valor de categoría
  const handleChange = (key, value) => {
    setGeneroData((prev) => ({ ...prev, [key]: Number(value) }))
  }

  // Agregar nueva categoría
  const handleAdd = () => {
    if (!newName.trim()) return
    setGeneroData((prev) => ({
      ...prev,
      [newName.trim()]: 50, // valor por defecto 50%
    }))
    setNewName("")
  }

  // Eliminar categoría
  const handleDelete = (key) => {
    const { [key]: _, ...rest } = generoData
    setGeneroData(rest)
  }

  return (
    <div className="w-full max-w-md p-2">
      <h2 className="text-lg">Género</h2>

      {Object.keys(generoData).map((key) => (
        <div key={key} className="mt-1">
          <div className="flex justify-between items-center mb-1">
            <span className="capitalize text-white font-medium">{key}</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{generoData[key]}%</span>
              <button
                onClick={() => handleDelete(key)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <ProgressBar value={generoData[key]} color="bg-orange-500" />

          <input
            type="range"
            min="0"
            max="100"
            value={generoData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full mt-1"
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
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {/* PERCEPCION DE GENERO */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Percepción de género</label>
        <input
          type="text"
          placeholder="Escribe tu percepción"
          value={percepcionGenero}
          onChange={(e) => setPercepcionGenero(e.target.value)}
          className="w-full px-3 py-2 rounded bg-zinc-800 text-white outline-none"
        />
      </div>
    </div>
  )
}

export default Genero