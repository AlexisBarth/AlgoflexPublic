import { CreateUserDto } from "src/users/dto"

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createUserDtoStub = (): CreateUserDto => {
    return {
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        email: 'mockEmail',
        password: 'mockValue',
    }
}