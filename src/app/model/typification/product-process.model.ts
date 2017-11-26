import { Product } from '../process/product.model';
import { Process } from '../process/process.model';

export class ProductProcess {
    constructor(
        public _id: string,
        public product: Product,
        public pendingCount: number,
        public totalCount: string,
        public completedCount: String,
        public processes: Process[]
    ) {

    }
}
