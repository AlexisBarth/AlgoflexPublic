import { DockerTestResult } from "src/gateways/models";
import { Submission } from "../../entities/submission.entity";

// On envoie pas l'objet par réference pour evité que l'objet soit muté, on retourne une fonction
export const submissionStub = (): Submission => {
    return {
        uid: '1',
        language: 'French',
        questionId: '1',
        solution: 'solution',
        userId: '1',
        status: DockerTestResult.Success
    }
}