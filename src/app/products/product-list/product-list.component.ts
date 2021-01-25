import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mproduct } from 'src/app/shared/models/mproduct.model';
import { MproductService } from 'src/app/shared/services/mproduct.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Mproduct[];

  constructor(private mproductService: MproductService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let products = this.mproductService.getAll();
      this.products = await products == null && products == undefined ? [] : await products;
    } catch (err) {
      console.error(err);
    }
  }

  onAddProduct() {
    this.router.navigate([this.router.url, 'product']);
  }

  onLinkProduct(id: number) {
    this.router.navigate([this.router.url, 'product', id]);
  }

}
