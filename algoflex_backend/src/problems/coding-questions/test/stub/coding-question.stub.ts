import { CodingQuestion } from "../../entities/coding-question.entity"
import { SubmissionStatistic } from "../../entities/submission-statistics"

export const submissionStatisticStub = (): SubmissionStatistic => {
    return {
        uid: '1',
        correctCount: 1,
        failureCount: 0
    }
}

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const codingQuestionStub = (): CodingQuestion => {
    return {
        uid: '1',
        name: 'mockName',
        description: 'mockDescription',
        theme: 'mockTheme',
        prompt: 'mockPrompt',
        testCases: 'mockTestCases',
        submissionStatistics: submissionStatisticStub()
    }
}