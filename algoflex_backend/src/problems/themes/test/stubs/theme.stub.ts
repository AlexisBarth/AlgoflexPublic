import { Theme } from "../../entities"

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const themeStub = (): Theme => {
    return {
        uid: '1',
        name: 'mockName',
        description: 'mockDescription',
        imageUrl: 'mockImageUrl'
    }
}