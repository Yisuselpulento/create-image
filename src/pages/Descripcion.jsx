import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FaTrash } from "react-icons/fa"

const Descripcion = () => {
  const { descripcionData, setDescripcionData } = useOutletContext()

  // Estado local para inputs temporales
  const [marca, setMarca] = useState(descripcionData.marca || "")
  const [perfume, setPerfume] = useState(descripcionData.perfume || "")
  const [descripcion, setDescripcion] = useState(descripcionData.descripcion || "")

  // Notas
  const [notaTipo, setNotaTipo] = useState("salida") // salida, corazon, fondo
  const [notaNombre, setNotaNombre] = useState("")
  const [notaImagen, setNotaImagen] = useState(null)

  // Manejar agregar nota
  const handleAddNota = () => {
    if (!notaNombre) return

    const newNota = {
      name: notaNombre,
      image: notaImagen ? URL.createObjectURL(notaImagen) : null
    }

    setDescripcionData((prev) => {
      const updatedNotas = { ...prev.notas }
      updatedNotas[notaTipo] = [...(updatedNotas[notaTipo] || []), newNota]
      return { ...prev, notas: updatedNotas }
    })

    setNotaNombre("")
    setNotaImagen(null)
  }

  // Manejar eliminar nota
  const handleRemoveNota = (tipo, index) => {
    setDescripcionData((prev) => {
      const updatedNotas = { ...prev.notas }
      updatedNotas[tipo] = updatedNotas[tipo].filter((_, i) => i !== index)
      return { ...prev, notas: updatedNotas }
    })
  }

  // Manejar guardar marca, perfume y descripcion
  const handleGuardarInfo = () => {
    setDescripcionData((prev) => ({
      ...prev,
      marca,
      perfume,
      descripcion
    }))
  }

  return (
    <div className="text-white bg-stone-950 min-h-screen p-2">
      <h2 className="mb-4">Configuración</h2>

      {/* Marca y Perfume */}
      <div className="mb-4">
        <label className="block mb-1">Marca:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-stone-800 text-white placeholder:text-zinc-400 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          placeholder="Ej: Carolina Herrera"
        />

        <label className="block mb-1">Nombre del perfume:</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-stone-800 text-white placeholder:text-zinc-400 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={perfume}
          onChange={(e) => setPerfume(e.target.value)}
          placeholder="Ej: Bad Boy Le Parfum"
        />

        <label className="block mb-1">Descripción:</label>
        <textarea
          className="w-full p-2 rounded bg-stone-800 text-white placeholder:text-zinc-400 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe una descripción del perfume..."
          rows={3}
        />
        <button
          onClick={handleGuardarInfo}
          className="bg-indigo-600 text-xs hover:bg-indigo-700 px-3 py-1 rounded"
        >
          Guardar Información
        </button>
      </div>

      {/* Agregar Notas */}
      <div className="mb-4 border-t border-zinc-700 pt-4">
        <h2 className="text-xl mb-2">Agregar Nota</h2>

        <select
          value={notaTipo}
          onChange={(e) => setNotaTipo(e.target.value)}
          className="p-2 rounded bg-stone-800 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="salida">Nota de Salida</option>
          <option value="corazon">Nota de Corazón</option>
          <option value="fondo">Nota de Fondo</option>
        </select>

        <input
          type="text"
          placeholder="Nombre de la nota"
          className="p-2 rounded bg-stone-800 text-white mb-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={notaNombre}
          onChange={(e) => setNotaNombre(e.target.value)}
        />

        <label className="inline-block mr-2 mb-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded cursor-pointer text-white">
          {notaImagen ? "Imagen seleccionada" : "Seleccionar imagen"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setNotaImagen(e.target.files[0])}
          />
        </label>

        <button
          onClick={handleAddNota}
          className="bg-indigo-600 text-xs hover:bg-indigo-700 px-3 py-1 rounded"
        >
          Agregar Nota
        </button>
      </div>

      {/* Mostrar Notas */}
      {["salida", "corazon", "fondo"].map((tipo) => (
        <div key={tipo} className="mb-4">
          <h3 className="text-lg capitalize mb-2">{tipo === "salida" ? "Notas de Salida" : tipo === "corazon" ? "Notas de Corazón" : "Notas de Fondo"}</h3>
          {descripcionData.notas[tipo]?.length === 0 && (
            <p className="text-sm text-zinc-400">No hay notas agregadas</p>
          )}
          {descripcionData.notas[tipo]?.map((nota, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              {nota.image && (
                <img src={nota.image} alt={nota.name} className="h-8 w-8 object-cover rounded" />
              )}
              <span className="text-white">{nota.name}</span>
              <button
                onClick={() => handleRemoveNota(tipo, i)}
                className="ml-2 px-2 py-1 bg-red-600 rounded text-xs hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Descripcion