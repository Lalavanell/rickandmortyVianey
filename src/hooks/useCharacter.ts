import { fetchDataCharactersApi, fetchDataLocationApi, fetchDataEpisodeApi, insertDataFromRamApi, getCharactersApi, postCharacterApi, putCharacterApi, deleteCharacterApi } from "../api/character.api";
import { Character } from "../interfaces/character.interface";
import { DataMassive } from "../interfaces/data-massive.interface";



export function useCharacter() {

  
  const fetchDataCharacters = async() => {
    try {
      const response = await fetchDataCharactersApi();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchDataLocation = async() => {
    try {
      const response = await fetchDataLocationApi();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchDataEpisode = async() => {
    try {
      const response = await fetchDataEpisodeApi();
      return response;
    } catch (error) {
      throw error;
    }
  };

   const insertDataFromRam = async (dataMassive: DataMassive) => {
    try {
      const response = await insertDataFromRamApi(dataMassive);
      return response;
    } catch (error) {
      throw error;
    }
  };
    
  const getCharacters = async() => {
    try {
      const response = await getCharactersApi();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const postCharacter = async (formValue: Character) => {
    try {
      const response = await postCharacterApi(formValue);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const putCharacter = async (formValue: Character) => {
    try {
      const response = await putCharacterApi(formValue);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteCharacter = async (characterId: string) => {
    try {
      const response = await deleteCharacterApi(characterId);
      return response;
    } catch (error) {
      throw error;
    }
  };


  return {
    getCharacters,
    postCharacter,
    putCharacter,
    deleteCharacter,
    fetchDataCharacters,
    fetchDataLocation,
    fetchDataEpisode,
    insertDataFromRam
  }

}