import * as htmlToImage from "html-to-image"

export const useDownloadImage = () => {

  const download = async (ref, fileName = "mi-imagen.png") => {
    if (!ref?.current) return

    try {
      const width = ref.current.offsetWidth
      const height = ref.current.offsetHeight

      const scale = 1024 / width

      const dataUrl = await htmlToImage.toPng(ref.current, {
        width: width * scale,
        height: height * scale,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        },
      })

      const link = document.createElement("a")
      link.download = fileName
      link.href = dataUrl
      link.click()

    } catch (error) {
      console.error("Error al generar imagen:", error)
    }
  }

  return { download }
}