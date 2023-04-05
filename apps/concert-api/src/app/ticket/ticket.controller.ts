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
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';
@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService,) { }

    @Get()
    async getTickets(): Promise<Ticket[]> {
        return await this.ticketService.getTickets();
    }

    @Post()
    async createTicket(@Body() ticket: Ticket, @Body('concert') concertId: string, @InjectToken() token: Token): Promise<Ticket> {
        return await this.ticketService.createTicket(ticket, token.id, concertId);
    }
}