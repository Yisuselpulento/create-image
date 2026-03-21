// ImageThumb.jsx
const ImageThumb = ({ file, className = "", showLabel = true }) => {
  if (!file) return null;

  // Si file es un objeto (File), creamos la URL, si es string la usamos directo
  const src = typeof file === "string" ? file : URL.createObjectURL(file);

  return (
    <div className="flex flex-col items-start">
      {showLabel && <p className="text-xs text-zinc-400 mb-1">Vista previa:</p>}
      <img
        src={src}
        alt="Vista previa"
        className={`object-cover rounded border border-zinc-700 ${className}`}
        // Limpieza básica si se creó una URL local
        onLoad={() => {
          if (typeof file !== "string") URL.revokeObjectURL(src);
        }}
      />
    </div>
  );
};

export default ImageThumb;