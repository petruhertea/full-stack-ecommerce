import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { OrderHistory } from '../../common/order-history';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService){}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const email = JSON.parse(this.storage.getItem('userEmail')!);
    
    this.orderHistoryService.getOrderHistory(email).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }
}
