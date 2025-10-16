import { Character } from "./character.interface";


export interface CharacterProps {
    action: string;
    characterId: string | null;
    viewCharacterData: Character | null;
    editCharacterData: Character | null;
    openCloseModal: () => void;
    getCharactersBackend: () => void;
}