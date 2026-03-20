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
    <div className="w-full max-w-md">

      <h2 className="text-xl mb-4">Configuración</h2>

      {Object.keys(cuandoUsarloData).map((key) => (
        <div key={key} className="mb-3">
          <label className="block capitalize mb-1">{key}</label>

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