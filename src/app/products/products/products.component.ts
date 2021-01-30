import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductDataService } from '@core/index';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'sau-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'action'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.productDataService.getAllProducts().subscribe(products => this.onDataLoad(products)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onDataLoad(products) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.data = products;
  }

}
