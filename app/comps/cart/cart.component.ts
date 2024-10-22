import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/entity/Food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
orderd:number=0;
getTotalPrice() {
return this.cart.food ? this.cart.food.reduce((total: number, foodItem: { price: number; orderdQuantity: number; }) => {
  return total + (foodItem.price * foodItem.orderdQuantity);
}, 0) : 0;
}
storeTotalPriceInLocalStorage() {
  const totalPrice = this.getTotalPrice();
  localStorage.setItem('totalPrice', totalPrice.toString());
}
dummyfood: Food = {
  foodId: 0,
  foodName: '',
  description: '',
  price: 0,
  orderdQuantity:0,
  isDisable: false,
  quantity: 0,
  url: '',
  category: {
    categoryId: 0,
    categoryName: '',
  },
  cart: {
    cartId: 0,
  },
};
  cart: any = {};
   
  constructor(private foodService:FoodService,private cartService: CartService,private router:Router) { }
  
  ngOnInit(): void {
    this.cartService.getCartbyId(1).subscribe(  //change here user.id
      (data: any) => {
        this.cart = data;
        //console.log(this.cart); 
      },
      (error) => {
        console.error('Error fetching cart:', error); 
      }
    );
  }

  deleteItem(food:any){
    food.cart =0;
    this.foodService.updateFood(food).subscribe(
      (data: any) => {
       window.alert("Item removed successfully");
       this.router.navigate(['/cart']);
      }
    );
  }
  goToOrderDetails(){
    this.storeTotalPriceInLocalStorage();
      this.router.navigate(['/orderDetails']);
  }
  updateOrderQuantity(food: any, newQuantity: number) {
    this.dummyfood.foodId = food.foodId
    this.dummyfood.foodName = food.foodName
    this.dummyfood.orderdQuantity=newQuantity
    this.dummyfood.quantity=food.quantity
    this.dummyfood.isDisable=food.isDisable
    this.dummyfood.price=food.price
    this.dummyfood.description=food.description
    this.dummyfood.url=food.url
 
    this.dummyfood.category.categoryId=food.category.categoryId;
    this.dummyfood.category.categoryName=food.category.categoryName;
    this.dummyfood.cart.cartId=1;

   
    
    
   this.foodService.updateFood(this.dummyfood).subscribe((data) => {
    window.alert("Quanity updated...")
    console.log("updated"+data); // Log the response
  });
  }
  increment(product: any) {
    if (product.quantity > product.orderdQuantity){
    product.orderdQuantity++;this.orderd++;}
  }
   
  decrement(product: any) {
    if (product.quantity > 0 && product.orderdQuantity > 0) {
      product.orderdQuantity--;this.orderd--;
    }
  }
  goTODash(){
    this.router.navigate(['/dashboard']);
  }
}
