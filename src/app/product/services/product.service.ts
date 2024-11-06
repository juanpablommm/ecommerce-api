import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productName: string;
  description: string;
  urlImage: string;
  publishedTime: string;
  brand: string;
  price: number;
  enabled: boolean;
  productCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/product-management/product/find/all';

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
