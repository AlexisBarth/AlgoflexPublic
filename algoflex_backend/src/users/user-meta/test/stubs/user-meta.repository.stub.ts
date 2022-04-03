import { UserMeta } from "../../entities/user-meta.entity";

let userMetaList : UserMeta[] = [];

export const mockUserMetaRepository = {
    clear: () => {userMetaList = []},
    find: jest.fn().mockImplementation(user => {
        return userMetaList.find(e => e.userId === user.userId);
    }),
    findOne: jest.fn().mockImplementation((userMeta) => {
        if (userMeta.userId === undefined) {
            return userMetaList.find(e => (e.uid === userMeta));
        } else {
            return userMetaList.find(e => (e.userId === userMeta.userId));
        }
    }),
    save: jest.fn().mockImplementation((dto: UserMeta) => {
        if (userMetaList.find(e => e.uid === dto.uid)) {
            return dto;
        }
        dto.uid = Date.now().toString();
        userMetaList.push(dto);
        return dto;
    }),
    preload: jest.fn().mockImplementation((dto: UserMeta) => {
        let oldUserMeta = userMetaList.find(e => e.uid === dto.uid);
        if (!oldUserMeta) {
            return undefined
        }
        userMetaList = userMetaList.filter(i => i !== oldUserMeta);
        dto.userId = oldUserMeta.userId
        userMetaList.push(dto);
        return dto;
    }),
    remove: jest.fn().mockImplementation(dto => {
        userMetaList = userMetaList.filter(i => i !== dto);
        return dto;
    })
}
export const userMetaRepositoryStub = () => {
    return mockUserMetaRepository;
}
