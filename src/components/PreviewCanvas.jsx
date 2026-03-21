import { forwardRef } from "react"

const PreviewCanvas = forwardRef(({ data, PreviewComponent }, ref) => {
  return (
    <div ref={ref} className="w-full h-123 shadow-lg overflow-hidden relative flex items-center justify-center bg-black">
      {/* BACKGROUND */}
     <div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: "url('/wallpaper.png')" }}
/>

      {/* OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90%] h-[90%]">
          <PreviewComponent data={data} />
        </div>
      </div>
    </div>
  )
})

export default PreviewCanvas