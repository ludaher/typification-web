
export class Product {

  [x: string]: any;
    constructor(
        public _id: string,
        public ProductId: number = 0,
        public Active: boolean = true,
        public ProductName: String = '',
        public ProductDescription: String = '',
        public NumberOfTypifications: number = 0,
    ) {

    }
}
