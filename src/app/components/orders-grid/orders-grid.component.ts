import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order';
import { StatusService } from '../services/status.service';
import { Status } from 'src/app/models/status';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.css'],
})
export class OrdersGridComponent implements OnInit {
  orders: Order[] = [];
  ordersCopy: Order[] = [];
  columnsNames: string[] = [
    'Cliente',
    'Producto',
    'Fecha creación',
    'Status',
    'Cantidad',
    'Precio',
    'Anticipo',
    'Pago total',
    'Subtotal',
    'Factura #.',
    'Capturado por',
  ];
  public dropdownOpen = false;
  orderStatuses = [];
  selectedStatus: string = 'Todos';
  isVisible: boolean = false;
  loggedUser: any;

  constructor(
    public date: DatePipe,
    public dialog: MatDialog,
    private orderService: OrderService,
    private statusService: StatusService
  ) {
    this.loggedUser = this.getUser();
  }
  ngOnInit(): void {
    this.selectOrders();
    this.selectStatus();
  }
  getUser(): any {
    const user = localStorage.getItem('user');
    console.log(JSON.parse(user))
    return user ? JSON.parse(user) : null;
  }
  selectOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      this.ordersCopy = structuredClone(this.orders);
    });
  }
  selectStatus() {
    this.statusService.getStatus().subscribe((data: Status[]) => {
      this.orderStatuses = [{ key: 'Todos', name: 'Todos' }, ...data];
    });
  }
  onclickExport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.orders);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Ordenes al dia.xlsx');
  }
  calculateOverdue(order: Order) {
    const today = new Date().getTime();
    const createdDate = new Date(order.createdDateTime).getTime();
    const diffInMs = today - createdDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays >= 7) {
      order.isOverdue = true;
    }
  }
  onclickStatus(status: any) {
    if (status.key === 'Todos') {
      return (this.orders = this.ordersCopy);
    } else {
      this.orders = this.ordersCopy.filter((x) => x.statusKey === status.key);
    }

    return this.orders;
  }
  openDialog() {
    this.isVisible = true;
  }
  closeModalHandler(ev) {
    this.isVisible = false;
  }
}
