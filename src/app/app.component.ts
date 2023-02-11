import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Customer, Order } from './entities';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {

  customerForm: FormGroup;
  selectedCustomer: Customer;
  filteredOrders: Order[];

  customers: Customer[] = [
    { "id": 1, "name": "Aria DeLuca", "orderIds": [1,2]},
    {"id": 2, "name": "Eliza Cohen", "orderIds": [3,4]}];

  orders: Order[] = [{"id": 1, "name": "vikas"}, {"id": 2, "name": "sharma"}, {"id": 3, "name": "cricket"}, {"id": 4, "name": "vlog"}];  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customer: "",
      order: ""
    });

    let customerId = 1;
    this.setFormControlValues(customerId);
  }

  setFormControlValues(customerId: number) {
    if (customerId == 0) {
      this.customerForm.get('customer').setValue("(new customer)");
      this.customerForm.get('order').setValue("(new order)");
    }
    else  {
      this.selectedCustomer = this.customers.find(i => i.id == customerId);
      this.filteredOrders = this.getCustomerOrders(this.selectedCustomer);

      this.customerForm.get('customer').setValue(this.selectedCustomer.name);
      this.customerForm.get('order').setValue(this.filteredOrders[0].id);
    }
  }

  getCustomerOrders(customer: Customer) : Order[] {
    let orders: Order[] = [];

    for (var id = 0; id < customer.orderIds.length; id++)  {
      let orderId = customer.orderIds[id];
      orders.push(this.orders.find(i => i.id == orderId));
    }

    return orders;
  }

  onCustomerChanged(event: any) {    
    let customer = this.customers.find(n => n.name == event.target.value);

    if (customer == undefined) {
      this.filteredOrders = [];
      this.setFormControlValues(0);
    }
    else {
      this.selectedCustomer = customer;
      this.setFormControlValues(this.selectedCustomer.id);
    }
  }
}

