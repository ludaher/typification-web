
export class Process {
    constructor(
        public _id: string,
        public processId: number,
        public productId: number,
        public processStatus: number,
        public fileName: String,
        public relativePath: string,
        public totalPages: number,
        public productionDate: Date,
        public createBy: string,
        public createdOn: number,
        public modifiedBy: string,
        public modifiedOn: number,
        public fileGeneratorStatus: number
    ) {

    }
}
