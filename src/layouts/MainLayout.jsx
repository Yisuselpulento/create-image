import { Link, Outlet, useLocation } from "react-router-dom"
import { useState, useRef } from "react"

import PreviewCanvas from "../components/PreviewCanvas"
import PreviewDrawer from "../components/PreviewDrawer"
import { useDownloadImage } from "../hooks/useDownloadImage"

const MainLayout = () => {
  const [showPreview, setShowPreview] = useState(true)

  const [cuandoUsarloData, setCuandoUsarloData] = useState({
    invierno: 50,
    primavera: 50,
    verano: 50,
    otono: 50,
    dia: 50,
    noche: 50,
  })

  const [perfumeName, setPerfumeName] = useState("")

  const location = useLocation()
  const previewRef = useRef(null)
  const { download } = useDownloadImage()

  const sectionName = location.pathname.replace("/", "") || "acordes"

  const formatName = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  const fileName = `${sectionName}-${formatName(perfumeName || "perfume")}.png`

  return (
    <div className="h-screen flex bg-zinc-900 text-white overflow-hidden">

      {/* PANEL IZQUIERDO */}
      <div className="w-[400px] p-4 overflow-y-auto border-r border-zinc-800">
        
        <nav className="flex flex-wrap gap-2 mb-4">
          <Link to="/">Acordes</Link>
          <Link to="/longevidad">Longevidad</Link>
          <Link to="/descripcion">Descripción</Link>
          <Link to="/genero">Género</Link>
          <Link to="/cuando-usarlo">Cuándo usarlo</Link>
          <Link to="/estela">Estela</Link>
        </nav>

        <Outlet context={{ cuandoUsarloData, setCuandoUsarloData }} />
      </div>

      {/* DRAWER (fuera del flujo normal) */}
      <PreviewDrawer
        show={showPreview}
        setShow={setShowPreview}
        previewRef={previewRef}
        cuandoUsarloData={cuandoUsarloData}
        perfumeName={perfumeName}
        setPerfumeName={setPerfumeName}
        download={download}
        fileName={fileName}
        PreviewCanvas={PreviewCanvas}
      />
      
    </div>
  )
}

export default MainLayout