import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from './modules/prime-ng.module';



const importsExports = [
  PrimeNgModule,
  CommonModule,
  RouterModule,
];




@NgModule({
  declarations: [],
  imports: [...importsExports],
  exports: [...importsExports],
  providers: [],
})
export class SharedModule {}
