import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { InjectToken, Token } from '../auth/token.decorator';
import { AdminGuard } from '../roles/roles.guard';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';
@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService,) { }

    @Get()
    @UseGuards(AdminGuard)
    async getTickets(): Promise<Ticket[]> {
        return await this.ticketService.getTickets();
    }

    @Post()
    async createTicket(@Body() ticket: Ticket, @Body('concert') concertId: string, @InjectToken() token: Token): Promise<Ticket> {
        return await this.ticketService.createTicket(ticket, token.id, concertId);
    }

    @Get('reserved')
    async getTicketsByUserId(@InjectToken() token: Token): Promise<Ticket[]> {
        return await this.ticketService.getTicketsByUserId(token.id);
    }

    @Get('reserved/concert/:id')
    async getTicketFromUserByConcert(@InjectToken() token: Token, @Param('id') concertId): Promise<Ticket> {
        return await this.ticketService.getTicketFromUserByConcert(token.id, concertId)
    }

    @Get('concert/:id')
    async getTicketsByConcertId(@Param('id') concertId: string): Promise<Ticket[]> {
        return await this.ticketService.getTicketsByConcertId(concertId);
    }
}