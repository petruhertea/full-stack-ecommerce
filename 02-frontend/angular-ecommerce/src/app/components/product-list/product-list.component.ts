import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // pagination properties
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if the search keyword is different than the previous one set the page to 1

    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(
                        this.pageNumber - 1,
                        this.pageSize, 
                        theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the 'id' param string and convert it to number by using the '+' symbol
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // default the category id to 1 if id is not available
      this.currentCategoryId = 1;
    }

    // Check if the category is different from the previous
    // Angular will reuse a component if it is currently viewed

    // set the page number to 1 if the category is different

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber = ${this.pageNumber}`)

    this.productService.getProductListPaginate(this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.pageSize = + pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${ product.name },  ${product.unitPrice}`);

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }
}
