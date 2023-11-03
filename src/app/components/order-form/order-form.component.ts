import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order';
import { StatusService } from '../services/status.service';
import { Status } from 'src/app/models/status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit, AfterViewInit {
  loggedUser: any = null;
  order: Order = null;
  todayString: string = this.getTodayAsString();
  orderForm: FormGroup;
  statuses: Status[] = [];
  action: 'create' | 'edit' = 'create';
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private StatusService: StatusService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.order = data.order;
    this.action = data.action;
    this.loggedUser = data.loggedUser;
  }

  ngAfterViewInit(): void {
    if (!this.loggedUser) {
      const userString = localStorage.getItem('user');
      this.loggedUser = userString ? JSON.parse(userString) : null;
      this.orderForm.get('createdBy').setValue(this.loggedUser?.name);
    }
  }

  ngOnInit() {
    this.createForm();
    if (this.order != null) {
      this.orderForm.patchValue(this.order);
    }
    this.getStatuses();
  }

  getStatuses() {
    this.StatusService.getStatus().subscribe((res: Status[]) => {
      this.statuses = res;
    });
  }
  createForm() {
    this.orderForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      payInAdvance: [0, Validators.required],
      invoiceNumber: [''],
      // Estos son campos que se llenan automáticamente
      createdDateTime: [''],
      createdBy: [this.loggedUser?.name],
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
    if (!this.orderForm.valid) return;

    if (this.action === 'edit') {
      this.updateOrder();
    } else {
      this.orderForm.patchValue({
        createdDateTime: this.todayString,
      });
      this.saveOrder();
    }
  }
  saveOrder() {
    const order: Order = this.orderForm.getRawValue();
    order.updatedBy = null;
    order.updatedDateTime = null;
    order.status = this.statuses.find((x) => x.key === order.statusKey);
    this.orderService.createOrder(order).subscribe((res) => {
      this._snackBar.open('Orden creada exitosamente!', 'Cerrar');
      this.dialogRef.close('Success');
    });
  }
  updateOrder() {
    const order: Order = this.orderForm.getRawValue();
    order.updatedBy = this.loggedUser?.name;
    order.updatedDateTime = this.todayString;
    order.id = this.order.id;

    order.status = this.statuses.find((x) => x.key === order.statusKey);
    console.log(order);
    this.orderService.updateOrder(order).subscribe((res) => {
      this._snackBar.open('Orden actualizada exitosamente!', 'Cerrar');
      this.dialogRef.close('Success');
    });
  }
  onClose() {
    this.dialogRef.close('Cancel');
  }
}
