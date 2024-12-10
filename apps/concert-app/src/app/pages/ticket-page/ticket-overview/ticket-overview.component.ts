import { ITicket, TicketService } from '@angular-concert-project/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-concert-project-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss'],
})
export class TicketOverviewComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService, private router: Router){}

  ngOnInit(): void {
    this.ticketService.getTicketsFromUser().subscribe((result) => {
      this.tickets = result;
    })
  }

  deleteTicket(ticketId: string): void {
    this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
  }

  navigateToConcert(concertId: string): void {
    this.router.navigate(['/concerts', concertId]);
  }

}
