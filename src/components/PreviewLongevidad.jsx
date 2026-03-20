import { getColor } from "../utils/getColor";

const PreviewLongevidad = ({ data }) => {

  return (
    <div className="text-white p-4 mt-6 opacity-80">
      <h1 className="text-center text-lg font-semibold mb-15">LONGEVIDAD</h1>

      {Object.keys(data).map((key) => (
        <div key={key} className="flex items-center gap-3 mb-3">
          {/* NOMBRE */}
          <span className="w-24 capitalize text-sm">{key}</span>

          {/* BARRA */}
          <div className="flex-1 h-2 bg-gray-700 rounded">
            <div
              className={`h-2 rounded ${getColor(data[key])}`}
              style={{ width: `${data[key]}%` }}
            />
          </div>

          {/* PORCENTAJE */}
          <span className="w-12 text-right text-orange-100">{data[key]}%</span>
        </div>
      ))}
    </div>
  );
};

export default PreviewLongevidad;