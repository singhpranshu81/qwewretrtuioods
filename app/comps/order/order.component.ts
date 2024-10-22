import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  dummyOrder = {
    orderId: 1,
    orderDate: new Date().toISOString(),
    orderStatus: 'Pending',
    cart: {
      cartId: 1
    }
  };  
  carty: any = {};
   
  constructor(private cartService:CartService,private orderService:OrderService,private router:Router) { } 
 totalPrice = localStorage.getItem('totalPrice');
 userName = JSON.parse(localStorage.getItem('user') || '{}').fullName;
 userId= JSON.parse(localStorage.getItem('user') || '{}').customerId;
  ngOnInit(): void {
    this.cartService.getCartbyId(1).subscribe( //change here user.id
      (data: any) => {
        this.carty = data;
        console.log(this.carty); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );

    this.orderService.createOrder(this.dummyOrder).subscribe( 
      (data: any) => {
        console.log('Order created:', data); 
      },
      (error) => {
        console.error('Error creating order:', error); 
      }
    );
  } 
  
  makePayment(){
  
    this.router.navigate(['/payment']);
    console.log('Payment made successfully  for order:', this.dummyOrder);
  }
}
