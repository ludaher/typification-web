import { Process } from '../process/process.model';
import { UserTypification } from './typification.model';

export class TypificationProcess {
    constructor(
        public _id: string,
        public process: Process,
        public typifications: UserTypification[],
        public typificationsCount: number
    ) {

    }

}
