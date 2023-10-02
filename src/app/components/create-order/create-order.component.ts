import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order';
import { StatusService } from '../services/status.service';
import { Status } from 'src/app/models/status';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() loggedUser: any = null;
  @Output() close = new EventEmitter<void>();
  todayString: string = this.getTodayAsString();
  orderForm: FormGroup;
  statuses: Status[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private StatusService: StatusService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.createForm();
    this.getStatuses();
  }
  getStatuses() {
    this.StatusService.getStatus().subscribe((res: Status[]) => {
      this.statuses = res;
    });
  }
  createForm() {
    this.orderForm = this.formBuilder.group({
      clientName: [''],
      productName: [''],
      quantity: [0],
      price: [0],
      payInAdvance: [0],
      invoiceNumber: [''],
      // Estos son campos que se llenan automáticamente
      createdDateTime: [''],
      createdBy: [{ value: this.loggedUser?.name, disabled: true }],
      statusKey: ['Pending'],
    });
  }
  getTodayAsString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so +1 is needed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  onSubmit() {
    this.orderForm.patchValue({
      createdDateTime: this.todayString,
    });
    console.log('Your form data : ', this.orderForm.value);
    this.saveOrder();
  }
  saveOrder() {
    const order: Order = this.orderForm.getRawValue();
    order.updatedBy = null;
    order.updatedDateTime = null;
    order.status = this.statuses.find((x) => x.key === order.statusKey);
    console.log(order);
    this.orderService.createOrder(order).subscribe((res) => {
      this._snackBar.open('Orden creada exitosamente!', 'Cerrar');
      this.close.emit();
    });
  }
  onClose() {
    this.close.emit();
  }
}
// [
//   'Cliente',
//   'Producto',
//   'Fecha creación',
//   'Status',
//   'Cantidad',
//   'Precio',
//   'Anticipo',
//   'Pago total',
//   'Subtotal',
//   'Factura #.',
//   'Capturado por',
// ];
