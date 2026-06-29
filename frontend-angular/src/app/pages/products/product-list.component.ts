import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, { width: '450px', data: product });
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadProducts(); });
  }

  deleteProduct(id: string) {
    if (confirm('Удалить товар?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}