import { SubmissionStatistic } from "../../entities/submission-statistics"

export const submissionStatisticStub = (): SubmissionStatistic => {
    return {
        uid: '1',
        correctCount: 1,
        failureCount: 0
    }
}
