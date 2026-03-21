import axios from "axios";

// Reemplaza con tu API key de Fragella
const API_KEY = "689cc5328a237df31b5bdd2c77c1d1e7a321328f3b5664bf14196a5e1366d8b6"; 
const BASE_URL = "https://api.fragella.com/api/v1"; // Endpoint base

// Función para buscar perfumes por nombre
export const searchPerfume = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/fragrances`, {
      headers: {
        "x-api-key": API_KEY
      },
      params: {
        search: name, // nombre del perfume a buscar
        limit: 10     // opcional: cantidad de resultados
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Error buscando perfume:", error);
    return null;
  }
};