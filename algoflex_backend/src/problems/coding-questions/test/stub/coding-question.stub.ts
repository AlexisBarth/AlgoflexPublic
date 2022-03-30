import { CodingQuestion } from "../../entities/coding-question.entity"
import { submissionStatisticStub } from "./submission-statistics.stub"

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const codingQuestionStub = (): CodingQuestion => {
    return {
        uid: '1',
        name: 'mockName',
        description: 'mockDescription',
        theme: 'mockTheme',
        prompt: 'mockPrompt',
        submissionStatistics: submissionStatisticStub()
    }
}
