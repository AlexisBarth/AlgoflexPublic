import { Submission } from "../../entities/submission.entity"

let submissionList : Submission[] = [];

export const mockSubmissionRepository = {
    clear: () => {submissionList = []},
    find: jest.fn().mockImplementation(user => {
        return submissionList.find(e => e.userId === user.userId);
    }),
    findOne: jest.fn().mockImplementation((submission) => {
        if (submission.uid === undefined) {
            return submissionList.find(e => (e.uid === submission));
        } else {
            return submissionList.find(e => (e.uid === submission.uid));
        }
    }),
    save: jest.fn().mockImplementation((dto: Submission) => {
        if (submissionList.find(e => e.uid === dto.uid)) {
            return dto;
        }
        dto.uid = Date.now().toString();
        submissionList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto: Submission) => {
        let oldSubmission = submissionList.find(e => e.uid === dto.uid);
        if (!oldSubmission) {
            return undefined
        }
        submissionList = submissionList.filter(i => i !== oldSubmission);
        dto.userId = oldSubmission.userId
        submissionList.push(dto);
        return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
        submissionList = submissionList.filter(i => i !== dto);
        return dto;
    })
}
export const submissionRepositoryStub = () => {
    return mockSubmissionRepository;
}
