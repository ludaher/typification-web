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
  error: string;
  warning: string;
  loading = false;

  constructor(private service: TypificationService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.service
      .getProducts()
      .subscribe(
        data => {
          this.products = data;
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.error = err.error.message;
        }
      );
  }

  assignProcess(productId) {
    this.loading = true;
    this.service
      .assignProcess(productId)
      .subscribe(
        data => this.router.navigate(['/typify', productId], { queryParams: { processId: data } }),
        err => {
          this.loading = false;
          this.error = err.error.message;
        }
      );
  }
}
