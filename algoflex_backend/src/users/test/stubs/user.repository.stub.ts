import { User } from "src/users/entity";

let userList : User[] = [];

export const mockUserRepository = {
    clear: () => {userList = []},
    find: jest.fn().mockImplementation(() => userList),
    findOne: jest.fn().mockImplementation((uid: string) => {
        return userList.find(e => e.uid === uid);
    }),
    save: jest.fn().mockImplementation((dto: User) => {
        if (userList.find(e => e.uid === dto.uid)) {
            return dto;
        }
        dto.uid = Date.now().toString();
        userList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto: User) => {
        let oldUser = userList.find(e => e.uid === dto.uid);

        if (!oldUser) {
            return undefined
        }
        userList = userList.filter(i => i !== oldUser);
        userList.push(dto);
        return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
        userList = userList.filter(i => i !== dto);
        return dto;
    })
}
export const userRepositoryStub = () => {
    return mockUserRepository;
}
