import React from "react";

const PreviewDescripcion = ({ data }) => {
  if (!data) return null;

  const { marca, perfume, descripcion, notas } = data;

  return (
    <div className="text-white p-1 mt-1 opacity-80">
      {/* Marca + presenta */}
      {marca && <h1 className="text-center text-xs ">{marca} presenta</h1>}

      {/* Nombre del perfume */}
      {perfume && (
        <h2 className="text-center text-4xl  mb-2 text-orange-200 mb-5">
          {perfume}
        </h2>
      )}

      {/* Descripción */}
      {descripcion && (
  <p className="text-center text-xs text-zinc-300 mb-4">
    {perfume && <span className="text-orange-200">{perfume}:</span>} {descripcion}
  </p>
)}

      {/* Notas */}
      {["salida", "corazon", "fondo"].map((tipo) => (
        <div key={tipo} className="p-3">
          <h3 className="text-sm font-medium mb-2">
            {tipo === "salida"
              ? "Notas de Salida"
              : tipo === "corazon"
              ? "Notas de Corazón"
              : "Notas de Fondo"}
          </h3>
          <div className="flex flex-wrap ">
            {notas[tipo]?.map((nota, i) => (
              <div
                key={i}
                className="flex  items-center gap-3  rounded "
              >
                {nota.image && (
                  <img
                    src={nota.image}
                    alt={nota.name}
                    className="h-7 w-7 object-cover rounded"
                  />
                )}
                <span className="text-xs text-white">{nota.name}</span>
              </div>
            ))}
            {notas[tipo]?.length === 0 && (
              <span className="text-xs text-zinc-400">No hay notas agregadas</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewDescripcion;