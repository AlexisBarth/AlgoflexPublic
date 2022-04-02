import { CreateUserMetaDto } from "../../dto/create-user-meta.dto"
import { UpdateUserMetaDto } from "../../dto/update-user-meta.dto"

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createUserMetaDtoStub = (): CreateUserMetaDto => {
    return {
        questionId: 'mockQuestionId',
        userCode: 'mockUserCode'
    }
}

export const updateUserMetaDtoStub = (): UpdateUserMetaDto => {
    return createUserMetaDtoStub();
}