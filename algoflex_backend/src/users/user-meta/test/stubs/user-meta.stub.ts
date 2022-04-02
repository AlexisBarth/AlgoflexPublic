import { UserMeta } from "../../entities/user-meta.entity"

export const userMetaStub = (): UserMeta => {
    return {
        uid: '1',
        userId: '1',
        questionId: '1',
        userCode: 'mockUserCode'
    }
}