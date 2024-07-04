import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
const exportCurrentModule = [
  TableModule,
  ButtonModule,
  PaginatorModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...exportCurrentModule],
})
export class PrimeNgModule {}
