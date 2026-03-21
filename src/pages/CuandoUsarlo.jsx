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

      <h2 className=" mb-4">Configuración</h2>

      {Object.keys(cuandoUsarloData).map((key) => (
        <div key={key}>
         <label className="block capitalize mb-1 flex items-center gap-2">
          <span >{key}</span>
          <span className="text-white text-xs">
            {cuandoUsarloData[key]}%
          </span>
        </label>

          <input
            type="range"
            min="0"
            max="100"
            value={cuandoUsarloData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full accent-blue-700"
          />

        </div>
      ))}

    </div>
  )
}

export default CuandoUsarlo