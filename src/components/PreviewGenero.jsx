const PreviewGenero = ({ data, percepcionGenero }) => {
  // Función para interpolar colores de rosa a azul según porcentaje
  const getColor = (value) => {
    // Rosa: #EC4899 → Azul: #3B82F6
    const start = { r: 236, g: 72, b: 153 }; // rosa
    const end = { r: 59, g: 130, b: 246 };  // azul

    const r = Math.round(start.r + ((end.r - start.r) * value) / 100);
    const g = Math.round(start.g + ((end.g - start.g) * value) / 100);
    const b = Math.round(start.b + ((end.b - start.b) * value) / 100);

    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="text-white p-4 mt-6 opacity-80">
      <h1 className="text-center text-lg font-semibold mb-8">Género</h1>

      {Object.keys(data).map((key) => (
        <div key={key} className="flex items-center gap-3 mb-3 text-xs">
          {/* NOMBRE */}
          <span className="w-30 capitalize text-xs">{key}</span>

          {/* BARRA */}
          <div className="flex-1 h-2 bg-gray-700 rounded">
            <div
              className="h-2 rounded"
              style={{
                width: `${data[key]}%`,
                backgroundColor: getColor(data[key]),
                transition: "background-color 0.3s ease",
              }}
            />
          </div>

          {/* PORCENTAJE */}
          <span className="w-6 text-right text-orange-100">{data[key]}%</span>
        </div>
      ))}

      {/* PERCEPCION DE GENERO */}
      <div className="mt-4">
        <div className="px-1 py-2 rounded text-white text-xs">
          Percepción de género: {percepcionGenero || "—"}
        </div>
      </div>
    </div>
  );
};

export default PreviewGenero;