import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"

import Acordes from "./pages/Acordes"
import Longevidad from "./pages/Longevidad"
import Descripcion from "./pages/Descripcion"
import Genero from "./pages/Genero"
import CuandoUsarlo from "./pages/CuandoUsarlo"
import Estela from "./pages/Estela"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Acordes />} />
          <Route path="longevidad" element={<Longevidad />} />
          <Route path="descripcion" element={<Descripcion />} />
          <Route path="genero" element={<Genero />} />
          <Route path="cuando-usarlo" element={<CuandoUsarlo />} />
          <Route path="estela" element={<Estela />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App