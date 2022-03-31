import { CodingQuestion } from "../../entities/coding-question.entity"

let codingQuestionList : CodingQuestion[] = [];

export const mockCodingQuestionRepository = {
    find: jest.fn().mockImplementation(() => codingQuestionList),
    findOne: jest.fn().mockImplementation((uid:string) => {
        let codingQuestion : CodingQuestion | undefined;
        codingQuestion = codingQuestionList.find(e => e.uid === uid);
        return codingQuestion
    }),
    save: jest.fn().mockImplementation(dto => {
        if (codingQuestionList.find(e => e.uid === dto.uid))
        return dto;
        let uid: String;
        uid = Date.now().toString();
        dto.uid = uid;
        codingQuestionList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto) => {
        let id : String = dto.uid;
        let codingQuestion : CodingQuestion | undefined;
        codingQuestion = codingQuestionList.find(e => e.uid === id);

        if (!codingQuestion) return undefined
        codingQuestionList.filter(i => i !== codingQuestion);

        dto.uid = id;
        codingQuestionList.push(dto);
        return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
        codingQuestionList = codingQuestionList.filter(i => i !== dto);
        return dto;
    })
}
export const codingQuestionRepositoryStub = () => {
    return mockCodingQuestionRepository;
}
