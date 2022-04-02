import { themeStub } from "../test/stubs/theme.stub"

export const ThemesService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(themeStub()),
    findAll: jest.fn().mockResolvedValue([themeStub()]),
    create: jest.fn().mockResolvedValue(themeStub()),
    update: jest.fn().mockResolvedValue(themeStub().uid),
    remove: jest.fn().mockResolvedValue(themeStub())
})