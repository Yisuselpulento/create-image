import { useState, useEffect, useRef } from "react";
import { searchPerfume } from "../services/perfumeApi";

const PerfumeSearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Limpia timeout previo si hay
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Espera 500ms antes de hacer la request
    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await searchPerfume(query);
        if (data) setResults(data);
      } catch (error) {
        console.error("Error buscando perfume:", error);
      }
    }, 500); // <-- medio segundo de debounce
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (perfume) => {
    onSelect(perfume);
    setQuery(perfume.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
        placeholder="Buscar perfume..."
        className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none"
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded shadow-lg max-h-60 overflow-y-auto">
          {results.map((perfume) => (
            <li
              key={perfume.id}
              onClick={() => handleSelect(perfume)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-purple-800 cursor-pointer"
            >
              {perfume.image && (
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <span>{perfume.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PerfumeSearchBar;