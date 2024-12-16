import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../../models/ticket.model';
import { environment } from '@angular-concert-project/util-env';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  endpoint = environment.dataApiUrl;

  constructor(private httpClient: HttpClient){}

  getTickets(): Observable<ITicket[]> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
    return this.httpClient.get<ITicket[]>(`${this.endpoint}/data/ticket`, { headers });
  }

  addTicket(ticket: ITicket): Observable<ITicket> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});    

    return this.httpClient.post<ITicket>(`${this.endpoint}/data/ticket`, ticket, {headers});
  }

  getTicketFromUserByConcert(concertId: string): Observable<ITicket> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});  

    return this.httpClient.get<ITicket>(`${this.endpoint}/data/ticket/reserved/concert/${concertId}`, { headers });
  }

  getTicketsFromUser() : Observable<ITicket[]> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});  

    return this.httpClient.get<ITicket[]>(`${this.endpoint}/data/ticket/reserved`, { headers });
  }

  removeTicketFromUser(id: string): Observable<ITicket> {
    const token = localStorage.getItem('token');		
    const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});

    return this.httpClient.delete<ITicket>(`${this.endpoint}/data/ticket/${id}`, { headers });
  }
}
