import { Submission } from "../../entities/submission.entity"

let submissionList : Submission[] = [];

export const mockSubmissionRepository = {
    find: jest.fn().mockImplementation(() => submissionList),
    findOne: jest.fn().mockImplementation((uid:string) => {
        let submission : Submission | undefined;
        submission = submissionList.find(e => e.uid === uid);
        return submission
    }),
    save: jest.fn().mockImplementation(dto => {
        if (submissionList.find(e => e.uid === dto.uid))
            return dto;
        dto.uid = Date.now().toString();
        submissionList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto) => {
        let id : String = dto.uid;
        let submission = submissionList.find(e => e.uid === id);

        if (!submission) return undefined
        submissionList = submissionList.filter(i => i !== submission);
        dto.uid = id;
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
