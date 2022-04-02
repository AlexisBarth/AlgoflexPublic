import { CreateSubmissionDto } from "../../dto/create-submission.dto" 

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const createSubmissionDtoStub = (): CreateSubmissionDto => {
    return {
        language: 'French',
        questionId: '1',
        solution: 'solution'
    }
}