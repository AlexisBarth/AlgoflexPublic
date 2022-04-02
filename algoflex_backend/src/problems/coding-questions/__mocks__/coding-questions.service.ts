import { codingQuestionStub } from "../test/stub/coding-question.stub" 

export const CodingQuestionsService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(codingQuestionStub()),
    findByTheme: jest.fn().mockResolvedValue([codingQuestionStub()]),
    findAll: jest.fn().mockResolvedValue([codingQuestionStub()]),
    create: jest.fn().mockResolvedValue(codingQuestionStub()),
    update: jest.fn().mockResolvedValue(codingQuestionStub()),
    remove: jest.fn().mockResolvedValue(codingQuestionStub())
})