import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-product-modal',
  standalone: true,
  imports: [],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'

})
export class ProductModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
