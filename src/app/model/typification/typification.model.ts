
export class UserTypification {
    constructor(
        public _id: string,
        public page: number,
        public documentTypeId1: string,
        public documentTypeId2: string,
        public documentTypeId3: string,
        public typification1: UserTypification,
        public typification2: UserTypification,
        public typificationIsCorrect: boolean
    ) {

    }
}
