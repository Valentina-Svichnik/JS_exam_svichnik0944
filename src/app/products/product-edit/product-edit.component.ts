import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mproduct } from 'src/app/shared/models/mproduct.model';
import { MproductService } from 'src/app/shared/services/mproduct.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  product: Mproduct;
  productForm: FormGroup;

  constructor(
    private activatedRouter: ActivatedRoute,
    private mproductsService: MproductService,
    private router: Router
  ) { 
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      vendor: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      manufacturer: new FormControl(null),
      category: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      count: new FormControl(1, [Validators.required]),
    });
    this.getData();
  }


  async getData() {
    if (this.id !== null && this.id !== undefined) {
      try {
        let product = this.mproductsService.getOneById(this.id);
        this.product = await product;
      } catch (err) {
        console.error(err);
      }
      this.productForm.patchValue({                                  //заносим значения полей в форму для редактирвоания
        name: this.product.name,
        vendor: this.product.vendor,
        price: this.product.price,
        manufacturer: this.product.manufacturer,
        category: this.product.category,
        weight: this.product.weight,
        count: this.product.count,
      });
    }
  }

  async onSave() {
    if (this.id !== null && this.id !== undefined) {
      try {
        await this.mproductsService.putOneById(this.id, this.productForm.value);
      } catch (err) {
        console.error(err);
      }
      this.router.navigate(['/products']);
    } else {
      try {
        let res = await this.mproductsService.postOne(this.productForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
      this.router.navigate(['/products']);
    }
  }

  async onDelete() {
    try {
      await this.mproductsService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/products']);
  }
}
