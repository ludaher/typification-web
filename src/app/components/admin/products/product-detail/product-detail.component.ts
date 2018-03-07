import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../../../model/process/product.model';
import { DocumentalTypesService } from '../../../../services/admin/documental-types.service';
import { BaseComponent } from '../../../base-component';
import { ProductsService } from '../../../../services/admin/products.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {

  fileName: string;
  @Input() Product: Product;

  _product: Product;
  get product(): Product {
    return this._product;
  }

  @Input('product')
  set product(value: Product) {
    this._product = value;
    this.loadDocumentalTypes(this._product.productId);
  }

  @Output() cancel = new EventEmitter<number>();
  @Output() saveComplete = new EventEmitter();
  @Output() error = new EventEmitter<string>();

  @ViewChild('fileInput') fileInput: ElementRef;

  fileData: any;
  loading = false;

  documentalTypes: any[];

  constructor(private productService: ProductsService, private documentalTypesService: DocumentalTypesService) {
    super();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.productService
      .update<Product>(this.product)
      .safeSubscribe(
        this,
        result => {
          this.loading = false;
          this.saveComplete.emit();
        },
        error => {
          this.error.emit('Ha ocurrido un error con la aplicación');
        }
      );
  }

  cancelClick(): void {
    this.cancel.emit();
  }


  loadDocumentalTypes(productId): void {
    if (!productId) {
      return;
    }
    this.documentalTypesService
      .getList<any>(`ProductId,13,${productId}`, null, null, 'Value', true)
      .safeSubscribe(
        this,
        result => {
          this.documentalTypes = result.resultList;
        },
        error => {
          this.error.emit('Ha ocurrido un error con la aplicación');
        }
      );

  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileData = reader.result.split(',')[1];
        this.fileName = this.fileInput.nativeElement.value;

      };
    }
  }

  clearFile() {
    this.fileData = null;
    this.fileInput.nativeElement.value = '';
    this.fileName = '';
  }


  uploadFile() {
    if (!this.fileData || this.fileData == null) {
      this.error.emit('No se ha cargado ningún archivo.');
      return;
    }

    this.documentalTypesService
      .saveFile(this._product.productId, this.fileData)
      .safeSubscribe(
        this,
        result => {
          this.loading = false;
          this.clearFile();
          this.loadDocumentalTypes(this._product.productId);
        },
        error => {
          this.error.emit('Ha ocurrido un error con la aplicación');
        }
      );
  }

  changeRequired(type) {
    type.required = !type.required;
    this.documentalTypesService
      .update(type)
      .safeSubscribe(
        this,
        result => {
          this.loading = false;
        },
        error => {
          type.required = !type.required;
          this.error.emit('Ha ocurrido un error con la aplicación');
        }
      );
  }
}
