import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';

import { HttpService } from '@core/services/http.service';

const PROVIDERS = [
  HttpService,
];
@NgModule({
  imports: [CommonModule],
  providers: [...PROVIDERS, { provide: ErrorHandler }],
})
export class CoreModule {}
