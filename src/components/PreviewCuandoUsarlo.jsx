import ProgressBar from "./ProgressBar"
import {
  WiSnow,
  WiDaySunny,
  WiNightClear,
  WiDaySunnyOvercast 
} from "react-icons/wi"
import { FaLeaf } from "react-icons/fa" 
import { FaSun } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { FaCloudRain } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { MdBeachAccess } from "react-icons/md";




const PreviewCuandoUsarlo = ({ data }) => {
 const estaciones = [
  { key: "invierno", icon: FaRegSnowflake, color: "text-blue-300", bg: "bg-blue-400" },
  { key: "primavera", icon: FaLeaf, color: "text-green-400", bg: "bg-green-400" },
  { key: "verano", icon: MdBeachAccess, color: "text-yellow-400", bg: "bg-yellow-400" },
  { key: "otono", icon: FaLeaf, color: "text-orange-400", bg: "bg-orange-400" },
]


  const momentos = [
  { key: "dia", icon: FaSun, color: "text-yellow-300", bg: "bg-yellow-300" },
  { key: "noche", icon: IoMdMoon, color: "text-indigo-400", bg: "bg-indigo-400" },
]

  return (
    <div className="w-full h-full p-5 flex flex-col text-white pt-10 opacity-80">

      {/* TÍTULO */}
      <h1 className="text-center text-lg font-semibold mb-8 text-orange-200 pb-4">
        CUANDO USARLO
      </h1>

      {/* ESTACIONES */}
      <div className="border border-orange-600 rounded px-2 py-1 mb-2 bg-black/40">

       {estaciones.map(({ key, icon: Icon, color, bg }, index) => (
          <div key={key}>

            <div className="flex items-center gap-3">

              {/* ICONO IZQUIERDA TOTAL */}
              <Icon className={`text-xl w-6 h-6 ${color}`} />

              {/* CONTENIDO */}
              <div className="flex-1">

                <div className="flex justify-between text-xs">
                  <span className="capitalize text-orange-200">{key}</span>
                  <span className="text-orange-200">{data[key]}%</span>
                </div>

              <ProgressBar 
  value={data[key]} 
  color={bg} 
/>

              </div>

            </div>

            {/* DIVISOR */}
            {index !== estaciones.length - 1 && (
              <div className="border-t border-orange-500 my-3"></div>
            )}

          </div>
        ))}

      </div>

      {/* DÍA / NOCHE */}
      <div className="border border-orange-500 rounded p-3 bg-black/40">

        {momentos.map(({ key, icon: Icon, color, bg }, index) => (
          <div key={key}>

            <div className="flex items-center gap-3">

              <Icon className={`text-xl w-6 h-6 ${color}`} />

              <div className="flex-1">

                <div className="flex justify-between text-xs">
                  <span className="capitalize text-orange-200">{key}</span>
                  <span className="text-orange-200">{data[key]}%</span>
                </div>

               <ProgressBar 
  value={data[key]} 
  color={bg} 
/>

              </div>

            </div>

            {/* DIVISOR */}
            {index !== momentos.length - 1 && (
              <div className="border-t border-orange-500 my-3"></div>
            )}

          </div>
        ))}

      </div>

    </div>
  )
}

export default PreviewCuandoUsarlo