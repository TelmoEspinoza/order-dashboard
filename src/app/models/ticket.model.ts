export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'InProgress' | 'WaitingForCustomer' | 'Resolved' | 'Closed';
export type TicketChannel = 'Email' | 'Phone' | 'Chat' | 'WhatsApp';
export type TicketImpact = 'SingleUser' | 'MultipleUsers' | 'AllUsers';
export type CustomerTier = 'Regular' | 'VIP';
export interface Ticket {
  id: number;
  subject: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  chanel: TicketChannel;
  category: string;
  tags: string[];

  priority: TicketPriority;

  status: TicketStatus;
  impact: TicketImpact;
  customerTier: CustomerTier;
  assignedTeam: string;
  assignee: string;
  createdAt: string;
  lastUpdatedAt: string;
  dueAt: string;
}
