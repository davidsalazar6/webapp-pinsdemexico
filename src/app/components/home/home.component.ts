import { Component } from '@angular/core';
import { Metric } from 'src/app/models/metric';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order';
import { MetricService } from '../services/metric.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  metrics: Metric[] = [];
  orders: Order[] = [];
  constructor(private metricService: MetricService) {
    this.getMetrics();
  }

  getMetrics() {
    this.metricService.getMetrics().subscribe((data: Metric[]) => {
      this.metrics = data;
    });
  }
  updateMetrics() {
    this.getMetrics();
  }
}
