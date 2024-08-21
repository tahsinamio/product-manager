import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    thumbnail: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct as Product).subscribe({
      next: (product) => {
        this.products.push(product);
        this.resetNewProduct();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  private resetNewProduct(): void {
    this.newProduct = {
      title: '',
      description: '',
      price: 0,
      category: '',
      brand: '',
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: [],
      thumbnail: '',
    };
  }
}
