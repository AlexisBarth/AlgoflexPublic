import { submissionStub } from "../test/stubs/submission.stub";

export const SubmissionsService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(submissionStub()),
    findAll: jest.fn().mockResolvedValue([submissionStub]),
    create: jest.fn().mockResolvedValue(submissionStub()),
    update: jest.fn().mockResolvedValue(submissionStub()),
    delete: jest.fn().mockResolvedValue(submissionStub())
})