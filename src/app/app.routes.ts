import { Routes } from '@angular/router';
import { OrdersDashboard } from './orders-dashboard/orders-dashboard';
import { TicketsBoard } from './tickets-board/tickets-board';
import { CustomComponents } from './custom-components/custom-components';

export const routes: Routes = [
  { path: 'orders', component: OrdersDashboard },
  { path: 'tickets', component: TicketsBoard },
  { path:'custom directives', component: CustomComponents },
];
