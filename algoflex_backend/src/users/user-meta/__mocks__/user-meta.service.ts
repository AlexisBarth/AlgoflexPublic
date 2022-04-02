import { userMetaStub } from "../test/stubs/user-meta.stub" 

export const UserMetaService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(userMetaStub()),
    findAll: jest.fn().mockResolvedValue([userMetaStub()]),
    create: jest.fn().mockResolvedValue(userMetaStub()),
    remove: jest.fn().mockResolvedValue(userMetaStub())
})