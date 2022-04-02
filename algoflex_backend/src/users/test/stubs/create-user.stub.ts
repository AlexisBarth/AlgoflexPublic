import { CreateUserDto, UpdateUserDto } from "src/users/dto"

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createUserDtoStub = (): CreateUserDto => {
    return {
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        email: 'mockEmail',
        password: process.env.PASSWORD as string,
    }
}

export const updateUserDtoStub = (): UpdateUserDto => {
    return createUserDtoStub();
}