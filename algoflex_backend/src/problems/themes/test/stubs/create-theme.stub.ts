import { CreateThemeDto } from "../../dto/create-theme.dto" 

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createThemeDtoStub = (): CreateThemeDto => {
    return {}
}