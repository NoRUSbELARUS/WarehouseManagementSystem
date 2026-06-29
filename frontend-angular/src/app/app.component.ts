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
import { RouterModule } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    RouterModule,    
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule,
    MatIconModule, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['sku', 'name', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.dataSource.filterPredicate = (data: Product, filter: string) => 
          data.name.toLowerCase().includes(filter) || data.sku.toLowerCase().includes(filter);
      },
      error: (err) => console.error('Ошибка загрузки данных:', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  deleteProduct(id: string) {
    if (confirm('Вы уверены, что хотите удалить товар?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Ошибка удаления: ' + err.message)
      });
    }
  }
}