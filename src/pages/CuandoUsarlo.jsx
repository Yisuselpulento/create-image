import { useOutletContext } from "react-router-dom"

const CuandoUsarlo = () => {
  const { cuandoUsarloData, setCuandoUsarloData } = useOutletContext()

  const handleChange = (key, value) => {
    setCuandoUsarloData((prev) => ({
      ...prev,
      [key]: Number(value),
    }))
  }

  return (
    <div className="w-full max-w-md p-2">

      <h2 className="text-lg mb-4">Configuración</h2>

      {Object.keys(cuandoUsarloData).map((key) => (
        <div key={key} className="mb-1">
         <label className="block capitalize mb-1 flex items-center gap-2">
          <span>{key}</span>
          <span className="text-white font-semibold">
            {cuandoUsarloData[key]}%
          </span>
        </label>

          <input
            type="range"
            min="0"
            max="100"
            value={cuandoUsarloData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full"
          />

        </div>
      ))}

    </div>
  )
}

export default CuandoUsarlo