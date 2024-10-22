import { Cart } from "./Cart";
import { Customer } from "./Customer";

    export interface IOrder {
        orderId: number;
        orderDate: Date; 
        orderStatus: string;
        cart: Cart; 
        customer:Customer;
    }