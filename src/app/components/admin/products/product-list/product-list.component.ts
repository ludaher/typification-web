import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductProcess } from '../../../../model/typification/product-process.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: ProductProcess[];

  @Output() clickProduct = new EventEmitter<number>();

  @Output() changeFilter = new EventEmitter<string>();

  @Output() changeOrder = new EventEmitter<any>();

  descendingOrder = false;
  orderColumn = 'ProductId';

  numberFilter: string;
  nameFilter: string;
  typificationsFilter: string;
  activeFilter: string;

  constructor() { }

  ngOnInit() {
  }


  clickRow(productId: number): void {
    this.clickProduct.emit(productId);
  }

  filter() {
    let filter = '';
    if (this.numberFilter && this.numberFilter !== '') {
      filter += '|ProductId,13,' + this.numberFilter;
    }
    if (this.nameFilter && this.nameFilter !== '') {
      filter += '|ProductName,0,' + this.nameFilter;
    }
    if (this.typificationsFilter && this.typificationsFilter !== '') {
      filter += '|NumberOfTypifications,13,' + this.typificationsFilter;
    }
    if (this.activeFilter && this.activeFilter !== '') {
      filter += '|Active,13,' + this.activeFilter;
    }
    this.changeFilter.emit(filter);
  }

  order(orderColumn) {
    this.orderColumn = orderColumn;
    this.descendingOrder = !this.descendingOrder;
    this.changeOrder.emit({ orderColumn: orderColumn, descendingOrder: this.descendingOrder });
  }
}
