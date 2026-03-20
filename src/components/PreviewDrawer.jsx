import { FaEye, FaEyeSlash } from "react-icons/fa"

const PreviewDrawer = ({
  show,
  setShow,
  previewRef,
  cuandoUsarloData,
  perfumeName,
  setPerfumeName,
  download,
  fileName,
  PreviewCanvas
}) => {
  return (
    <>
      {/* BOTÓN TOGGLE (flotante siempre visible) */}
      <button
        onClick={() => setShow(!show)}
        className="fixed top-4 right-4 z-[100] bg-black/60 backdrop-blur-md p-2 rounded-full text-white text-xl hover:text-orange-500 transition"
      >
        {show ? <FaEyeSlash className="h-3 w-3" /> : <FaEye className="h-3 w-3" />}
      </button>

      {/* DRAWER */}
      <div
        className={`fixed inset-0 z-50 bg-stone-900 transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* CONTENIDO */}
        <div className="w-full h-full flex flex-col items-center justify-center p-4">

          {/* CANVAS FULL */}
          <div className="w-full flex justify-center">
            <PreviewCanvas ref={previewRef} data={cuandoUsarloData} />
          </div>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Nombre del perfume"
            value={perfumeName}
            onChange={(e) => setPerfumeName(e.target.value)}
            className="mt-6 w-full max-w-[300px] px-3 py-2 rounded bg-zinc-800 text-white outline-none"
          />

          {/* BOTÓN DESCARGA */}
          <button
            onClick={() => download(previewRef, fileName)}
            className="mt-3 w-full max-w-[300px] bg-orange-600 hover:bg-orange-700 transition px-4 py-2 rounded"
          >
            Descargar imagen
          </button>

          {/* NOMBRE ARCHIVO */}
          <p className="mt-2 text-xs text-zinc-500 text-center">
            {fileName}
          </p>
        </div>
      </div>
    </>
  )
}

export default PreviewDrawer