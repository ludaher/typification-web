import { Component, OnInit } from '@angular/core';
import { ProductProcess } from '../../../model/typification/product-process.model';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/typification/validation.service';

@Component({
  selector: 'app-validation-selector',
  templateUrl: './validation-selector.component.html',
  styleUrls: ['./validation-selector.component.css']
})
export class ValidationSelectorComponent implements OnInit {
  isCollapsed: boolean[];
  products: ProductProcess[];
  warning: string;

  constructor(private service: ValidationService, private router: Router) { }

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
      data => this.router.navigate(['/validate', productId], { queryParams: { processId: data } }),
      err => {
        this.warning = err.error.error;
      }
      );
  }
}
