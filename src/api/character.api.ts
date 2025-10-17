import { environment } from "../environments/environment";
import { Character } from "../interfaces/character.interface";
import { DataMassive } from "../interfaces/data-massive.interface";

const BASE_URL_API = environment.baseUrlApi;
const BASE_URL_BACKEND = environment.baseUrlBackend;


export async function fetchDataCharactersApi() {
  try {
   const response = await fetch(`${BASE_URL_BACKEND}/api/v1/characters`);

    if (response.status !== 200) {
        throw new Error("Hubo un error en la consulta de characters del API!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchDataLocationApi() {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/v1/locations`);

    if (response.status !== 200) {
        throw new Error("Hubo un error en la consulta de locations del API!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchDataEpisodeApi() {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/v1/episodes`);

    if (response.status !== 200) {
        throw new Error("Hubo un error en la consulta de episodes del API!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function insertDataFromRamApi(dataMassive: DataMassive) {
  try {
    const url = `${BASE_URL_BACKEND}/api/v1/insertDataRam`;

    const params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(dataMassive),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al guardar el character!"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}


export async function getCharactersApi() {
  try {
    const url = `${BASE_URL_BACKEND}/api/v1/characters`;

    const response = await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();    
    return result;
  } catch (error) {
    console.error('💥 Fetch error:', error);
    throw error;
  }
}

export async function postCharacterApi(formValue: Character) {
  try {
    const url = `${BASE_URL_BACKEND}/api/v1/characters`;

    const params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

    // ✅ Acepta tanto 200 como 400 (pero maneja el 400 diferente)
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message); // ← Muestra el mensaje del backend
    }

    if (response.status !== 200) {
      throw new Error("Hubo un error al guardar el character!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}



export async function putCharacterApi(formValue: Character) {
  try {
    const url = `${BASE_URL_BACKEND}/api/v1/characters/${formValue.id}`;

    const params = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al editar el character!"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}



export async function deleteCharacterApi(characterId: string) {
  try {
    const url = `${BASE_URL_BACKEND}/api/v1/characters/${characterId}`;

    const params = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al eliminar el character!"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}