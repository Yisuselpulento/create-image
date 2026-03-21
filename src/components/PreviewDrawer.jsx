import { FaEye, FaEyeSlash } from "react-icons/fa"
import PreviewCanvas from "./PreviewCanvas"

const PreviewDrawer = ({
  show,
  setShow,
  previewRef,
  data,
  PreviewComponent,
  perfumeName,
  setPerfumeName,
  download,
  fileName,
}) => {
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed top-4 right-4 z-[100] bg-black/60 backdrop-blur-md p-2 rounded-full border border-stone-800 text-white text-xl hover:text-orange-500 transition"
      >
        {show ? <FaEyeSlash className="h-3 w-3 text-blue-400" /> : <FaEye className="h-3 w-3 text-blue-400" />}
      </button>

      <div
        className={`fixed inset-0 z-50 bg-stone-900 transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div className="w-full flex justify-center">
            <PreviewCanvas ref={previewRef} data={data} PreviewComponent={PreviewComponent} />
          </div>

          <input
            type="text"
            placeholder="Nombre del perfume"
            value={perfumeName}
            onChange={(e) => setPerfumeName(e.target.value)}
            className="mt-6 w-full max-w-[300px] px-3 py-2 rounded bg-zinc-800 text-white outline-none"
          />

          <button
            onClick={() => download(previewRef, fileName)}
            className="mt-3 w-full max-w-[300px] bg-orange-600 hover:bg-orange-700 transition px-4 py-2 rounded"
          >
            Descargar imagen
          </button>

          <p className="mt-2 text-xs text-zinc-500 text-center">{fileName}</p>
        </div>
      </div>
    </>
  )
}

export default PreviewDrawer