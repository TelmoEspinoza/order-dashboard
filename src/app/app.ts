import { Component, signal } from '@angular/core';

import { OrdersDashboard } from './orders-dashboard/orders-dashboard';

@Component({
  selector: 'app-root',
  imports: [OrdersDashboard ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('order-dashboard');
}
