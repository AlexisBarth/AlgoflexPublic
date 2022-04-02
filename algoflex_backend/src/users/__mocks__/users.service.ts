import { userStub } from "../test/stubs/user.stub"

export const UsersService = jest.fn().mockReturnValue({
    findById: jest.fn().mockResolvedValue(userStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),
    remove: jest.fn().mockResolvedValue(userStub())
})