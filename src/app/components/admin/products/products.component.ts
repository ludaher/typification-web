import { Component, OnInit } from '@angular/core';
import { ProductProcess } from '../../../model/typification/product-process.model';
import { ProductsService } from '../../../services/admin/products.service';
import { BaseComponent, safeSubscribe } from '../../base-component';
import { Product } from '../../../model/process/product.model';
// import { safeSubscribe  } from '../../safe-suscribe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  error = '';
  /// Propiedades generales
  viewList = true;
  /// Porpiedades para la lista
  loading = false;
  total = 0;
  page = 1;
  perPage = 10;
  totalPages = 0;
  pagesToShow = 0;
  products: ProductProcess[];
  warning: string;
  filter: string;
  orderColumn: string;
  descendingOrder = false;

  /// Propiedades para el detalle
  ///
  product = new Product('0');

  constructor(private service: ProductsService) {
    super();
  }

  ngOnInit() {
    this.updateData();
  }

  goToPage(page): void {
    this.page = page;
    this.updateData();
  }

  updateData(): void {
    this.loading = true;
    this.service
      .getSelect(
        'ProductId,ProductName,NumberOfTypifications,Active,ModifiedOn',
        this.filter,
        this.page,
        this.perPage,
        this.orderColumn,
        this.descendingOrder
      ).safeSubscribe(
        this,
        result => {
          this.total = result.total;
          this.products = result.resultList;
          this.pagesToShow = Math.ceil(this.total / this.perPage);
          this.products = result.resultList;
          this.loading = false;
        },
        error => this.error = 'Ha ocurrido un error con la aplicación'
      );
    this.viewList = true;
  }

  showProduct(productId): void {
    this.loading = true;
    this.service
      .getById<Product>(productId)
      .safeSubscribe(
        this,
        product => {
          this.product = product;
          console.log(this.product);
        },
        error => this.error = 'Ha ocurrido un error con la aplicación'
      );
    this.viewList = false;
  }

  showList(): void {
    this.viewList = true;
  }
  showError(error) {
    this.error = error;
  }
  changeFilter(filter) {
    this.filter = filter;
    this.updateData();
  }
  changeOrder(order) {
    this.orderColumn = order.orderColumn;
    this.descendingOrder = order.descendingOrder;
    this.updateData();
  }
}
