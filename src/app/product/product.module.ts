import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [ProductListComponent, ProductModalComponent, ProductService],
  imports: [
    CommonModule
  ],
  exports:[ProductListComponent, ProductModalComponent, ProductService]
})
export class ProductModule { }
