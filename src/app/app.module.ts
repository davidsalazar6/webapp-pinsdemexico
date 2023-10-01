import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersGridComponent } from './components/orders-grid/orders-grid.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from './environments/environment';
import { DatePipe } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from './components/services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusService } from './components/services/status.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrdersGridComponent,
    MetricsComponent,
    NavbarComponent,
    FooterComponent,
    CreateOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    AuthModule.forRoot(environment.auth),
  ],
  providers: [DatePipe, OrderService,StatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
