import { CreateCodingQuestionDto } from "../../dto/create-coding-question.dto" 

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createCodingQuestionDtoStub = (): CreateCodingQuestionDto => {
    return {
        name: 'mockName',
        description: 'mockDescription',
        theme: 'mockTheme',
        prompt: 'mockPrompt'
    }
}