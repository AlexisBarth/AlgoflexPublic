import { Theme } from "../../entities/theme.entity"

let themeList : Theme[] = [];

export const mockThemeRepository = {
    clear: () => {themeList = []},
    find: jest.fn().mockImplementation(() => themeList),
    findOne: jest.fn().mockImplementation((uid: string) => {
        return themeList.find(e => e.uid === uid);
    }),
    save: jest.fn().mockImplementation((dto: Theme) => {
        if (themeList.find(e => e.uid === dto.uid)) {
            return dto;
        }
        dto.uid = Date.now().toString();
        themeList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto: Theme) => {
        let oldTheme = themeList.find(e => e.uid === dto.uid);

        if (!oldTheme) {
            return undefined
        }
        themeList = themeList.filter(i => i !== oldTheme);
        themeList.push(dto);
        return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
        themeList = themeList.filter(i => i !== dto);
        return dto;
    })
}
export const themeRepositoryStub = () => {
    return mockThemeRepository;
}
