import { forwardRef } from "react"
import PreviewCuandoUsarlo from "./PreviewCuandoUsarlo"

const PreviewCanvas = forwardRef(({ data }, ref) => {
  return (
   <div 
  ref={ref}
  className="w-full h-123 shadow-lg overflow-hidden relative flex items-center justify-center bg-black"
>
  
  {/* BACKGROUND */}
  <div
    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/wallpaper.png')" }}
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-[90%] h-[90%]">
      <PreviewCuandoUsarlo data={data} />
    </div>
  </div>

</div>
  )
})

export default PreviewCanvas