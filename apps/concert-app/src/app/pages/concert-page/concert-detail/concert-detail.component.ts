import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConcert, ConcertService, AuthService, ITicket, TicketService } from '@angular-concert-project/shared'

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail.component.html',
  styleUrls: ['./concert-detail.component.css']
})
export class ConcertDetailComponent implements OnInit {
  concert: IConcert | undefined;
  ticket: ITicket | null = null;
  errMsg: string | null = null;

  constructor(private concertService: ConcertService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((c) => {
      this.concertService.getConcertById(c.get("id")!).subscribe((concert: any) => {
        this.concert = concert;

        if(this.authService.loggedIn.value){
          this.ticketService.getTicketFromUserByConcert(this.concert!.id).subscribe((result) => {
            if(result){
              this.ticket = result;
            }
          })
        }

      });
    })
  }

  navigateToArtistDetail(artistId: string) {
    this.router.navigate(['/artists', artistId]);
  }

  buyTicket(){
    if(!this.authService.loggedIn.value){
      this.router.navigate(['/login'])
      return;
    }

    let user;
    this.authService.getUserFromLocalStorage().subscribe((result) => {
      user = result;
    })

    var calculateSeatNumber = () => {
      const cap = this.concert?.location?.capacity;
      if(cap){ return Math.floor(Math.random() * cap) + 1}
      else {return null}
    }

    const ticket: any = {
      concert: this.concert?.id,
      user: user,
      buyDate: new Date(),
      seatNumber: calculateSeatNumber()
    }

    this.ticketService.addTicket(ticket).subscribe((result) => {
      location.reload();
    }, error => {
      this.errMsg = error.error.message;
    })

  }

}
