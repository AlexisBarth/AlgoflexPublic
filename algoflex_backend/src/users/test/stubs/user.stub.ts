import { User } from "src/users/entity" 

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const userStub = (): User => {
    return {
        uid: '1',
        email: 'mock@email.com',
        favoriteLangage: 'french',
        favoriteThemes: ['mockImageUrl'],
        lastLogin: 1,
        createdAt: '1',
        role: 'mockRole'
    }
}