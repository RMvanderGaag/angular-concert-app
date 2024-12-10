import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient){}

  getTickets(): Observable<ITicket[]> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
    return this.httpClient.get<ITicket[]>('http://localhost:3333/api/data/ticket', { headers });
  }

  addTicket(ticket: ITicket): Observable<ITicket> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});    

    return this.httpClient.post<ITicket>('http://localhost:3333/api/data/ticket/', ticket, {headers});
  }

  getTicketFromUserByConcert(concertId: string): Observable<ITicket> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});  

    return this.httpClient.get<ITicket>('http://localhost:3333/api/data/ticket/reserved/concert/' + concertId, { headers });
  }

  getTicketsFromUser() : Observable<ITicket[]> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});  

    return this.httpClient.get<ITicket[]>('http://localhost:3333/api/data/ticket/reserved/', { headers });
  }
}
