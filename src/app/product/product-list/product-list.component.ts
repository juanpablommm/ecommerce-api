import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductService } from '../services/product.service';

interface Product {
  productName: string;
  description: string;
  urlImage: string;
  publishedTime: string;
  brand: string;
  price: number;
  enabled: boolean;
  productCode: string;
}


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener los productos
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error product not found', error);
      }
    );
  }

  // Método para abrir el modal con el producto seleccionado
  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.selectedProduct = null;
  }
}
