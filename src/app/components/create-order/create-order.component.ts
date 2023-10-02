import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';

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
  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {
  }
  ngOnInit() {
    this.createForm();

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
      createdBy: [{ value: this.loggedUser?.name, disabled: true  }],
      status: ['Pending'],
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
    this.orderService.createOrder(this.orderForm.value).subscribe((res) => {
      console.log('Order created successfully!');
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
