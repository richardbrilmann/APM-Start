import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle = 'Product List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';

    private _listFilter: string;
    public get listFilter() {
        return this._listFilter;
    }
    public set listFilter(value) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    products: IProduct[] = [];

    constructor(private productService: ProductService){
    }

    onratingClicked(message: string): void{
        this.pageTitle = 'Product List:' + message;
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    performFilter(listFilter: string): IProduct[] {
       listFilter = listFilter.toLocaleLowerCase();
       return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1);

    }

    ngOnInit(): void {
        this.productService.getPoducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
}
