import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TypificationService } from '../../../services/typification/typification.service';
import { ProductProcess } from '../../../model/typification/product-process.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typification',
  templateUrl: './typification.component.html',
  styleUrls: ['./typification.component.css']
})
export class TypificationComponent implements OnInit {
  isCollapsed: boolean[];
  products: ProductProcess[];
  warning: string;

  constructor(private service: TypificationService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service
      .getProducts()
      .subscribe(
      data => this.products = data,
      err => console.log(err)
      );
  }

  assignProcess(productId) {
    this.service
      .assignProcess(productId)
      .subscribe(
      data => this.router.navigate(['/typify', productId], { queryParams: { processId: data } }),
      err => {
        this.warning = err.error.error;
      }
      );
  }
}
