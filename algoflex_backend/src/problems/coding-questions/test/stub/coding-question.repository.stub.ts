import { CodingQuestion } from "../../entities/coding-question.entity"

let codingQuestionList : CodingQuestion[] = [];

export const mockCodingQuestionRepository = {
    clear: () => {codingQuestionList = []},
    find: jest.fn().mockImplementation(() => codingQuestionList),
    findOne: jest.fn().mockImplementation((codingQuestion) => {
        if (codingQuestion.uid === undefined) {
            return codingQuestionList.find(e => (e.uid === codingQuestion));
        } else {
            return codingQuestionList.find(e => (e.uid === codingQuestion.uid));
        }
    }),
    save: jest.fn().mockImplementation((dto: CodingQuestion) => {
        if (codingQuestionList.find(e => e.uid === dto.uid)) {
            return dto;
        }
        dto.uid = Date.now().toString();
        codingQuestionList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto: CodingQuestion) => {
        let oldCodingQuestion = codingQuestionList.find(e => e.uid === dto.uid);

        if (!oldCodingQuestion) {
            return undefined
        }
        codingQuestionList = codingQuestionList.filter(i => i !== oldCodingQuestion);
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
