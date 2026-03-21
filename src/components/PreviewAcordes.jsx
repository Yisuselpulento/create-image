const PreviewAcordes = ({ data }) => {
  if (!data) return null;
  const { perfume, acordes } = data;

  return (
    <div className="p-4 mt-6 opacity-80">
      <h1 className="text-center text-xs font-bold text-orange-200">
        ACORDES PRINCIPALES
      </h1>
      {perfume && (
        <h2 className="text-center text-lg font-semibold mb-10 text-orange-200">
          {perfume}
        </h2>
      )}

      {acordes.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          No se han agregado acordes
        </p>
      ) : (
        acordes.map((acorde, i) => (
          <div key={i} className="flex items-center gap-1">
            {acorde.image && (
              <img
                src={acorde.image}
                alt={acorde.name}
                className="h-8 w-8 object-cover rounded border border-zinc-700 flex-shrink-0"
              />
            )}
            <div className="flex-1 relative h-8 bg-gray-700 rounded">
              <div
                className="absolute inset-0 h-8 rounded"
                style={{
                  width: `${acorde.percentage}%`,
                  backgroundColor: acorde.color,
                  transition: "all 0.3s ease",
                }}
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
                {acorde.name}
              </span>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-orange-100">
                {acorde.percentage}%
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviewAcordes;