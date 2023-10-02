import { Component, Input } from '@angular/core';
import { Metric } from 'src/app/models/metric';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent {
  @Input() metric!: Metric;
  constructor() { }
  ngOnInit(): void {

  }
  calculateMetrics() {

  }
}


