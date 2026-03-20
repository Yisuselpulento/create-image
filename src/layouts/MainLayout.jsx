import { Link, Outlet, useLocation } from "react-router-dom"
import { useState, useRef } from "react"

import PreviewCanvas from "../components/PreviewCanvas"
import PreviewDrawer from "../components/PreviewDrawer"
import { useDownloadImage } from "../hooks/useDownloadImage"

import PreviewCuandoUsarlo from "../components/PreviewCuandoUsarlo"
import PreviewLongevidad from "../components/PreviewLongevidad" // crearás este componente

const MainLayout = () => {
  const [showPreview, setShowPreview] = useState(true)
  const location = useLocation()
  const previewRef = useRef(null)
  const { download } = useDownloadImage()

  // --- ESTADOS DE CADA SECCIÓN ---
  const [cuandoUsarloData, setCuandoUsarloData] = useState({
    invierno: 50,
    primavera: 50,
    verano: 50,
    otono: 50,
    dia: 50,
    noche: 50,
  })

  const sections = [
  { name: "Acordes", path: "/" },
  { name: "Longevidad", path: "/longevidad" },
  { name: "Descripción", path: "/descripcion" },
  { name: "Género", path: "/genero" },
  { name: "Cuándo usarlo", path: "/cuando-usarlo" },
  { name: "Estela", path: "/estela" },
]

  const initialLongevidad = {
  Debil: 25,
  Moderada: 50,
  Duradera: 75,
  "Muy Duradera": 100,
}

  const [longevidadData, setLongevidadData] = useState(initialLongevidad)
  const [perfumeName, setPerfumeName] = useState("")

  // --- DEFINIR SECCIÓN ACTIVA ---
  const sectionName = location.pathname.replace("/", "") || "acordes"

  const sectionMap = {
    "cuando-usarlo": { data: cuandoUsarloData, PreviewComponent: PreviewCuandoUsarlo },
    "longevidad": { data: longevidadData, PreviewComponent: PreviewLongevidad },
    // agrega aquí otras secciones luego
  }

  const currentSection = sectionMap[sectionName] || sectionMap["cuando-usarlo"]

  // --- FORMATEO DE NOMBRE PARA DESCARGA ---
  const formatName = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  const fileName = `${sectionName}-${formatName(perfumeName || "perfume")}.png`

  return (
    <div className="h-screen flex bg-zinc-900 text-white overflow-hidden">
      {/* PANEL IZQUIERDO */}
      <div className="w-[400px] p-4 overflow-y-auto border-r border-zinc-800">
        <nav className="flex flex-wrap gap-2 mb-4 text-sm">
        {sections.map((section) => {
          // Verifica si el path coincide con la ruta actual
          const isActive = location.pathname === section.path;

          return (
            <Link
              key={section.path}
              to={section.path}
              className={`
                px-3 py-1 rounded cursor-pointer transition
                ${isActive ? 'bg-purple-800 text-white font-semibold' : 'bg-purple-600 hover:bg-purple-700 text-white'}
              `}
            >
              {section.name}
            </Link>
          );
        })}
      </nav>
        <Outlet
          context={{
            cuandoUsarloData,
            setCuandoUsarloData,
            longevidadData,
            setLongevidadData,
          }}
        />
      </div>

      {/* DRAWER */}
      <PreviewDrawer
        show={showPreview}
        setShow={setShowPreview}
        previewRef={previewRef}
        data={currentSection.data}
        PreviewComponent={currentSection.PreviewComponent}
        perfumeName={perfumeName}
        setPerfumeName={setPerfumeName}
        download={download}
        fileName={fileName}
      />

    </div>
    
  )
}

export default MainLayout