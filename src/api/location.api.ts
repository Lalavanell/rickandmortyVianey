import { environment } from "../environments/environment prod";

const BASE_URL_API = environment.baseUrlApi;



export async function getCharactersServerApi() {
  try {
    const url = `${BASE_URL_API}/character`;

    const headers = { 
      method: "GET", 
      headers: {"Content-Type": "application/json"} 
    };

    const response = await fetch(url, headers);

    if (response.status !== 200) {
        throw new Error("Hubo un error en la consulta de characters RAM!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}