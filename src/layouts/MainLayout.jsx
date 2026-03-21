import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

import PreviewDrawer from "../components/PreviewDrawer";
import { useDownloadImage } from "../hooks/useDownloadImage";

import PreviewAcordes from "../components/PreviewAcordes";
import PreviewGenero from "../components/PreviewGenero";
import PreviewEstela from "../components/PreviewEstela";
import PreviewLongevidad from "../components/PreviewLongevidad";
import PreviewCuandoUsarlo from "../components/PreviewCuandoUsarlo";
import PreviewDescripcion from "../components/PreviewDescripcion";

const MainLayout = () => {
  const location = useLocation();
  const previewRef = useRef(null);
  const { download } = useDownloadImage();
  const [showPreview, setShowPreview] = useState(true);

  // --- PERFUME ---
  const [perfumeName, setPerfumeName] = useState("Dior Sauvage");

  // --- SECCIONES ---
  const [acordesData, setAcordesData] = useState([]);
  const [cuandoUsarloData, setCuandoUsarloData] = useState({
    invierno: 50,
    primavera: 50,
    verano: 50,
    otono: 50,
    dia: 50,
    noche: 50,
  });
  const [longevidadData, setLongevidadData] = useState({
    Debil: 25,
    Moderada: 50,
    Duradera: 75,
    "Muy Duradera": 100,
  });
  const [estelaData, setEstelaData] = useState({
    Suave: 25,
    Moderada: 50,
    Pesada: 75,
    Enorme: 100,
  });
  const [generoData, setGeneroData] = useState({
    Femenino: 25,
    "Unisex inclinación femenina": 50,
    "Unisex neutro": 50,
    "Unisex con inclinación masculina": 50,
    Masculino: 75,
  });
  const [percepcionGenero, setPercepcionGenero] = useState("");

  const [descripcionData, setDescripcionData] = useState({
    marca: "",
    perfume: "",
    descripcion: "",
    notas: {
      salida: [],
      corazon: [],
      fondo: [],
    },
  });

  // --- NAVEGACIÓN ---
  const sections = [
    { name: "Acordes", path: "/" },
    { name: "Longevidad", path: "/longevidad" },
    { name: "Descripción", path: "/descripcion" },
    { name: "Género", path: "/genero" },
    { name: "Cuándo usarlo", path: "/cuando-usarlo" },
    { name: "Estela", path: "/estela" },
  ];

  const sectionName = location.pathname.replace("/", "") || "acordes";

  // --- MAPA DE SECCIONES PARA PREVIEW ---
  const sectionMap = {
    acordes: { data: acordesData, PreviewComponent: PreviewAcordes },
    "cuando-usarlo": { data: cuandoUsarloData, PreviewComponent: PreviewCuandoUsarlo },
    longevidad: { data: longevidadData, PreviewComponent: PreviewLongevidad },
    estela: { data: estelaData, PreviewComponent: PreviewEstela },
    genero: { data: generoData, PreviewComponent: PreviewGenero, extraProps: { percepcionGenero } },
    descripcion: { data: descripcionData, PreviewComponent: PreviewDescripcion },
  };

  const currentSection = sectionMap[sectionName] || sectionMap["acordes"];

  const formatName = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const fileName = `${sectionName}-${formatName(perfumeName || "perfume")}.png`;

  return (
    <div className="h-screen flex bg-stone-950 text-white overflow-hidden">
      {/* --- SIDEBAR --- */}
      <div className="w-[400px] p-4 overflow-y-auto border-r border-zinc-800">
        {/* Navegación */}
        <nav className="flex flex-wrap gap-2 mb-4 text-sm">
          {sections.map((section) => {
            const isActive = location.pathname === section.path;
            return (
              <Link
                key={section.path}
                to={section.path}
                className={`px-3 py-1 rounded cursor-pointer transition ${
                  isActive
                    ? "bg-purple-800 text-white font-semibold"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {section.name}
              </Link>
            );
          })}
        </nav>

        {/* --- OUTLET / SECCIÓN --- */}
        <Outlet
          context={{
            // Acordes
            acordesData,
            setAcordesData,
            perfumeName,
            setPerfumeName,
            // Cuando usarlo
            cuandoUsarloData,
            setCuandoUsarloData,
            // Longevidad
            longevidadData,
            setLongevidadData,
            // Estela
            estelaData,
            setEstelaData,
            // Género
            generoData,
            setGeneroData,
            percepcionGenero,
            setPercepcionGenero,
            // Descripción
            descripcionData,
            setDescripcionData,
          }}
        />
      </div>

      {/* --- PREVIEW --- */}
      <PreviewDrawer
        show={showPreview}
        setShow={setShowPreview}
        previewRef={previewRef}
        data={currentSection.data}
        PreviewComponent={(props) =>
          sectionName === "genero"
            ? <PreviewGenero {...props} percepcionGenero={percepcionGenero} />
            : <currentSection.PreviewComponent {...props} perfumeName={perfumeName} />
        }
        perfumeName={perfumeName}
        setPerfumeName={setPerfumeName}
        download={() => download(previewRef, fileName)}
        fileName={fileName}
      />
    </div>
  );
};

export default MainLayout;