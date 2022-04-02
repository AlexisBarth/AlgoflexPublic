import { BaseRequest, RequestUser, Role } from "src/common"

export const requestUserStub = (): RequestUser => {
    return {
        uid: '1',
        email: 'email@mock.com',
        favoriteLangage: 'French',
        lastLogin: 1,
        createdAt: 1,
        role: Role.Admin
    }
}

export const baseRequestStub = (): BaseRequest => {
    return {
        user: requestUserStub()
    } as any as BaseRequest
}
