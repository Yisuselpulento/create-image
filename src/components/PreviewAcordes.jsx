const PreviewAcordes = ({ data, perfumeName }) => {
  return (
    <div className="p-4 mt-6 opacity-80">
      {/* TÍTULO GENERAL */}
      <h1 className="text-center text-xl font-bold mb-2 text-orange-200">ACORDES PRINCIPALES</h1>
      {/* NOMBRE DEL PERFUME */}
      <h2 className="text-center text-lg font-semibold mb-10 text-orange-200">{perfumeName || "Perfume"}</h2>

      {data.length === 0 && (
        <p className="text-center text-sm text-zinc-400">No se han agregado acordes</p>
      )}

      {data.map((acorde, i) => (
        <div key={i} className="flex items-center gap-1">
          {/* IMAGEN PEQUEÑA A LA IZQUIERDA */}
          {acorde.image && (
            <img
              src={acorde.image}
              alt={acorde.name}
              className="h-8 w-8 object-cover rounded border border-zinc-700 flex-shrink-0"
            />
          )}

          {/* BARRA CON NOMBRE DENTRO */}
          <div className="flex-1 relative h-8 bg-gray-700 rounded">
            {/* BARRA DE COLOR SEGÚN PORCENTAJE */}
            <div
              className="absolute inset-0 h-8 rounded"
              style={{
                width: `${acorde.percentage}%`,
                backgroundColor: acorde.color,
                transition: "all 0.3s ease",
              }}
            />
            {/* NOMBRE SOBRE LA BARRA */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
              {acorde.name}
            </span>
            {/* PORCENTAJE AL FINAL DE LA BARRA */}
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-orange-100">
              {acorde.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PreviewAcordes