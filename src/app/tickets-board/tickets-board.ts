import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { Ticket, TicketPriority, TicketStatus } from '../models/ticket.model';

@Component({
  selector: 'app-tickets-board',
  imports: [NgClass, NgStyle],
  templateUrl: './tickets-board.html',
  styleUrl: './tickets-board.css',
})
export class TicketsBoard {
  searchText: string = '';
  selectedStatus: TicketStatus | 'All' = 'All';
  selectedPriority: TicketPriority | 'All' = 'All';
  // Dropdown options shown in the Status filter.
  // Kept in one place so template can render options using @for.
  statusOptions: Array<TicketStatus | 'All'> = [
    'All',
    'Open',
    'InProgress',
    'WaitingForCustomer',
    'Resolved',
  ];
  // Dropdown options shown in the Priority filter.
  priorityOptions: Array<TicketPriority | 'All'> = ['All', 'Low', 'Medium', 'High', 'Critical'];
  pageSizeOptions = [5, 10, 20];
  // Current page size selected by user.
  pageSize = 5;
  // Current page number (1-based index for user friendly display).
  currentPage = 1;
  selectedTicket: Ticket | null = null;

  tickets: Ticket[] = [
    {
      id: 1001,
      subject: 'Payment not processing for Order #5234',
      customer: 'Sarah Mitchell',
      customerEmail: 'sarah.mitchell@outlook.com',
      customerPhone: '+61 3 9876 5432',
      chanel: 'Email',
      category: 'Billing',
      tags: ['payment', 'urgent', 'melbourne'],
      priority: 'Critical',
      status: 'InProgress',
      impact: 'SingleUser',
      customerTier: 'VIP',
      assignedTeam: 'Finance Team - Docklands',
      assignee: 'James Chen',
      createdAt: '2026-04-07T09:30:00Z',
      lastUpdatedAt: '2026-04-08T14:45:00Z',
      dueAt: '2026-04-07T17:00:00Z',
    },
    {
      id: 1002,
      subject: 'Delivery address mismatch - delivery failed',
      customer: "Michael O'Brien",
      customerEmail: 'mobrrien@gmail.com',
      customerPhone: '+61 3 9654 3210',
      chanel: 'Phone',
      category: 'Shipping',
      tags: ['delivery', 'address', 'southyarra'],
      priority: 'High',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Logistics - Southbank',
      assignee: 'Emma Rodriguez',
      createdAt: '2026-04-09T11:15:00Z',
      lastUpdatedAt: '2026-04-09T11:15:00Z',
      dueAt: '2026-04-10T17:00:00Z',
    },
    {
      id: 1003,
      subject: 'Technical issue with app login',
      customer: 'Jessica Wong',
      customerEmail: 'j.wong@techmail.com.au',
      customerPhone: '+61 3 9432 1098',
      chanel: 'Chat',
      category: 'Technical Support',
      tags: ['app', 'login', 'bug', 'melbourne'],
      priority: 'Critical',
      status: 'InProgress',
      impact: 'MultipleUsers',
      customerTier: 'VIP',
      assignedTeam: 'Tech Support - Fitzroy',
      assignee: 'David Patel',
      createdAt: '2026-04-08T08:00:00Z',
      lastUpdatedAt: '2026-04-08T16:20:00Z',
      dueAt: '2026-04-08T18:00:00Z',
    },
    {
      id: 1004,
      subject: 'Refund request - defective product',
      customer: 'Robert Thompson',
      customerEmail: 'rthompson88@yahoo.com.au',
      customerPhone: '+61 3 9567 8901',
      chanel: 'Email',
      category: 'Returns & Refunds',
      tags: ['refund', 'defective', 'bayside'],
      priority: 'Medium',
      status: 'WaitingForCustomer',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Returns Team - Clayton',
      assignee: 'Lisa Anderson',
      createdAt: '2026-04-05T13:45:00Z',
      lastUpdatedAt: '2026-04-07T10:30:00Z',
      dueAt: '2026-04-12T17:00:00Z',
    },
    {
      id: 1005,
      subject: 'Account locked - security concern',
      customer: 'Amanda Foster',
      customerEmail: 'a.foster@corporate.com.au',
      customerPhone: '+61 3 9321 5678',
      chanel: 'Phone',
      category: 'Account Management',
      tags: ['security', 'locked', 'urgent', 'cbd'],
      priority: 'Critical',
      status: 'InProgress',
      impact: 'SingleUser',
      customerTier: 'VIP',
      assignedTeam: 'Security Team - Collingwood',
      assignee: 'Marcus Johnson',
      createdAt: '2026-04-08T15:30:00Z',
      lastUpdatedAt: '2026-04-08T16:10:00Z',
      dueAt: '2026-04-08T17:30:00Z',
    },
    {
      id: 1006,
      subject: 'Bulk order discount not applied',
      customer: 'Westside Trading Pty Ltd',
      customerEmail: 'accounts@westsidetrading.com.au',
      customerPhone: '+61 3 9876 4321',
      chanel: 'Email',
      category: 'Pricing',
      tags: ['bulk', 'discount', 'corporate', 'footscray'],
      priority: 'Medium',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'VIP',
      assignedTeam: 'Sales Support - Collingwood',
      assignee: 'Nicole Gray',
      createdAt: '2026-04-07T10:00:00Z',
      lastUpdatedAt: '2026-04-07T10:00:00Z',
      dueAt: '2026-04-11T17:00:00Z',
    },
    {
      id: 1007,
      subject: 'Missing items from shipment',
      customer: 'Christopher Lewis',
      customerEmail: 'c.lewis@email.com.au',
      customerPhone: '+61 3 9543 2109',
      chanel: 'Chat',
      category: 'Shipping',
      tags: ['missing-items', 'shipment', 'melbourne'],
      priority: 'High',
      status: 'Resolved',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Warehouse - Truganina',
      assignee: 'Sofia Martinez',
      createdAt: '2026-04-06T14:20:00Z',
      lastUpdatedAt: '2026-04-08T09:15:00Z',
      dueAt: '2026-04-10T17:00:00Z',
    },
    {
      id: 1008,
      subject: 'Website crashing during checkout',
      customer: 'Victoria Park Property Group',
      customerEmail: 'support@vpropgroup.com.au',
      customerPhone: '+61 3 9765 4321',
      chanel: 'Chat',
      category: 'Technical Support',
      tags: ['website', 'crash', 'checkout', 'urgent', 'eastmebourne'],
      priority: 'Critical',
      status: 'Closed',
      impact: 'AllUsers',
      customerTier: 'VIP',
      assignedTeam: 'Infrastructure - Melbourne CBD',
      assignee: 'Alexander Kim',
      createdAt: '2026-04-08T12:00:00Z',
      lastUpdatedAt: '2026-04-08T15:45:00Z',
      dueAt: '2026-04-08T16:00:00Z',
    },
    {
      id: 1009,
      subject: 'Subscription renewal issue',
      customer: 'Patricia Green',
      customerEmail: 'pgreen@subscription.com.au',
      customerPhone: '+61 3 9234 5678',
      chanel: 'Email',
      category: 'Subscriptions',
      tags: ['subscription', 'renewal', 'billing', 'brighton'],
      priority: 'Medium',
      status: 'InProgress',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Billing - Docklands',
      assignee: 'Henry Cooper',
      createdAt: '2026-04-04T16:30:00Z',
      lastUpdatedAt: '2026-04-08T13:25:00Z',
      dueAt: '2026-04-11T17:00:00Z',
    },
    {
      id: 1010,
      subject: 'Feature request - add dark mode',
      customer: 'Nathan Clarke',
      customerEmail: 'n.clarke@design.com.au',
      customerPhone: '+61 3 9654 7890',
      chanel: 'WhatsApp',
      category: 'Feature Request',
      tags: ['feature', 'ui', 'dark-mode', 'melbourne'],
      priority: 'Low',
      status: 'Open',
      impact: 'SingleUser',
      customerTier: 'Regular',
      assignedTeam: 'Product Team - Fitzroy',
      assignee: 'Olivia Bennett',
      createdAt: '2026-04-02T11:45:00Z',
      lastUpdatedAt: '2026-04-02T11:45:00Z',
      dueAt: '2026-04-30T17:00:00Z',
    },
  ];
    onSearchChange(value: string) {
    this.searchText = value ?? '';
    this.currentPage = 1;
  }
  // Runs when user changes Status filter.
  // Resets to first page because filtered data count changes.
  setStatus(value: TicketStatus | 'All') {
    this.selectedStatus = value;
    this.currentPage = 1;
  }
  // Runs when user changes Priority filter.
  setPriority(value: TicketPriority | 'All') {
    this.selectedPriority = value;
    this.currentPage = 1;
  }
  // Clears all filters and resets the board to default view.
  // NOTE: keep default values consistent with what you want to show on load.
  clearFilters() {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.selectedPriority = 'All';
    this.pageSize = 5; // default page size after reset
    this.currentPage = 1;
  }
  // Runs when user changes page size (5/10/20).
  // We also reset current page to 1 to avoid landing on an invalid page.
  onPageSizeChange(value: number) {
    this.pageSize = value;
    this.currentPage = 1;
  }
  // MODAL OPEN/CLOSE
  // Opens ticket details modal by setting selectedTicket.
  // Template shows modal using @if(selectedTicket).
  openTicketModal(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
  // Closes modal by clearing selectedTicket.
  closeTicketModal() {
    this.selectedTicket = null;
  }
  // FILTERING LOGIC (Computed list based on Search + Filters)
  // Returns tickets after applying:
  // 1) Search text match
  // 2) Status filter match
  // 3) Priority filter match
  get filteredTickets(): Ticket[] {
    const text = this.searchText.trim().toLowerCase();
    return this.tickets.filter(t => {
      // Search is applied across multiple fields for better real-world usability.
      const matchesText =
        !text ||
        String(t.id).includes(text) ||
        t.subject.toLowerCase().includes(text) ||
        t.customer.toLowerCase().includes(text) ||
        t.customerEmail.toLowerCase().includes(text);
      // Filter by status if user selected anything other than 'All'.
      const matchesStatus = this.selectedStatus === 'All' || t.status === this.selectedStatus;
      // Filter by priority if user selected anything other than 'All'.
      const matchesPriority = this.selectedPriority === 'All' || t.priority === this.selectedPriority;
      return matchesText && matchesStatus && matchesPriority;
    });
  }
  // PAGINATION LOGIC (Computed list for current page)
  // Total tickets after filters (used for footer "Total: X").
  get totalItems(): number {
    return this.filteredTickets.length;
  }
  // Total pages based on filtered total and selected page size.
  // Math.max(1, ...) ensures we never return 0 pages even when list is empty.
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }
  // Tickets shown in the table for the selected page.
  // slice() returns only the required part of the array.
  get pagedTickets(): Ticket[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTickets.slice(start, start + this.pageSize);
  }
  // Pagination actions (wired with First/Previous/Next/Last buttons).
  goToFirst() { this.currentPage = 1; }
  goToLast() { this.currentPage = this.totalPages; }
  goToPrevious() { if (this.currentPage > 1) this.currentPage--; }
  goToNext() { if (this.currentPage < this.totalPages) this.currentPage++; }
  // SLA HELPERS (Used for SLA minutes, breach state, progress)
  // "Now" time used for SLA calculations.
  // We keep it fixed for demo so output doesn't change on every refresh.
  // In real application, use: return Date.now();
  private now(): number {
   // return new Date('2026-01-28T13:00:00').getTime();
   return Date.now();
  }
  // Calculates how many minutes are left until SLA due time.
  // Positive => still within SLA
  // Negative => SLA already breached
  minutesLeft(t: Ticket): number {
    const due = new Date(t.dueAt).getTime();
    return Math.round((due - this.now()) / 60000);
  }
  // SLA is breached when minutesLeft is 0 or negative AND ticket is not resolved.
  // Resolved tickets are not treated as breached even if due time is in the past.
  isBreached(t: Ticket): boolean {
    return this.minutesLeft(t) <= 0 && t.status !== 'Resolved';
  }
  // A ticket is resolved when its status is "Resolved".
  // Used to disable action buttons and show green row highlighting.
  isResolved(t: Ticket): boolean {
    return t.status === 'Resolved';
  }
  // Calculates SLA progress percentage (0..100) for progress bar.
  // This is a simplified demo approach:
  // - totalMinutes is assumed as 240 min window
  // - "used" increases as due time approaches
  slaPercent(t: Ticket): number {
    const totalMinutes = 240;
    const used = totalMinutes - this.minutesLeft(t);
    const pct = Math.round((used / totalMinutes) * 100);
    return Math.max(0, Math.min(100, pct));
  }
  // BOOTSTRAP CLASS MAPPERS (Used with [ngClass])
  // Returns Bootstrap badge class based on priority.
  // Keeps template clean and avoids repeated switch logic inside HTML.
  priorityBadgeClass(p: TicketPriority): string {
    switch (p) {
      case 'Critical': return 'text-bg-danger';
      case 'High': return 'text-bg-warning text-dark';
      case 'Medium': return 'text-bg-info text-dark';
      case 'Low': return 'text-bg-secondary';
      default: return 'text-bg-dark';
    }
  }
  // Returns Bootstrap badge class based on status.
  statusBadgeClass(status: TicketStatus): string {
    switch (status) {
      case 'Open': return 'text-bg-primary';
      case 'InProgress': return 'text-bg-warning text-dark';
      case 'WaitingForCustomer': return 'text-bg-info text-dark';
      case 'Resolved': return 'text-bg-success';
      default: return 'text-bg-secondary';
    }
  }
  // Returns progress bar class based on SLA situation.
  // - Resolved => green
  // - Breached => red
  // - Nearing breach (>=80%) => warning
  // - Otherwise => blue
  progressBarClass(t: Ticket): string {
    if (this.isResolved(t)) return 'bg-success';
    if (this.isBreached(t)) return 'bg-danger';
    const pct = this.slaPercent(t);
    return pct >= 80 ? 'bg-warning' : 'bg-primary';
  }
  // Formats ISO date string into local readable format for UI.
  formatDate(iso: string): string {
    return new Date(iso).toLocaleString();
  }
}
