import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';
import { environment } from '@env';
import { signal } from '@angular/core';
import { AuditDto } from '@shared/models/audit-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();

  private readonly nestjsApiUrl = environment.NESTJS_API_URL;
  private readonly dotnetApiUrl = environment.DOTNET_API_URL;
  nestjs = signal<string | null>(null);  
  dotnet = signal<string | null>(null);
  auditDto = signal<AuditDto[]>([]);
  loading: boolean = false;  
  public constructor(public homeService: HomeService) {}


  public ngOnInit() {
    this.getNestjsAudits();
    this.getDotnetWeatherForecast();
    this.getNestjsHealth();
    this.getDotnetHealth();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public getNestjsAudits() { 
    this.subscription.add(
      this.homeService.get(this.nestjsApiUrl+'/audits')
        .subscribe((response) => {
          console.log(response);
        })
      );
  }
  public getDotnetWeatherForecast() { 
    this.loading = true;
    this.subscription.add(
      this.homeService.get(this.dotnetApiUrl+'/audit').subscribe({
        next: (audits) => {
          console.log('audits'+audits);
          if(audits){
            this.auditDto.set(audits);
            this.loading = false;
          }
        },
        error: (e) => {
          this.loading = false;
          console.log('HTTP Error', e)
        },
        complete: () => this.loading = false
      })
    );
  }

  public getNestjsHealth() {
    this.subscription.add(
      this.homeService.get(this.nestjsApiUrl+'/hello')
        .subscribe((response) => {
          console.log('health '+ response);
          if(response){
            this.nestjs.set(response);
          }
        })
      );
  }

  public getDotnetHealth() {
    this.subscription.add(
      this.homeService.get(this.dotnetApiUrl+'/hello')
        .subscribe((response) => {
          console.log('health '+ response);
          if(response){
            this.dotnet.set(response);
          }
        })
      );
  }
}
