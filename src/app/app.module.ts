import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

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
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from './components/services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusService } from './components/services/status.service';
import { MetricService } from './components/services/metric.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderFormComponent } from './components/order-form/order-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrdersGridComponent,
    MetricsComponent,
    NavbarComponent,
    FooterComponent,
    OrderFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    AuthModule.forRoot(environment.auth),
  ],
  providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    DatePipe,
    OrderService,
    StatusService,
    MetricService],
  bootstrap: [AppComponent],
})
export class AppModule {}
