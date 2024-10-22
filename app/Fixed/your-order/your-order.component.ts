import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-your-order',
  templateUrl: './your-order.component.html',
  styleUrls: ['./your-order.component.css']
})
export class YourOrderComponent {
  // dummyOrder = {
  //   orderId: 1,
  //   orderDate: new Date().toISOString(),
  //   orderStatus: 'Success',
  //   cart: {
  //     cartId: 1
  //   }
  // };  
  dummyOrder : any = {};
  carty: any = {};
   date = new Date().toISOString();
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

    // this.orderService.getOrderById(1).subscribe( //change here user.id
    //   (data: any) => {
    //     this.dummyOrder = data;
    //     console.log(this.dummyOrder); 
    //   },
    //   (error) => {
    //     console.error('Error fetching order:', error); 
    //   }
    // );
  } 
}
