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
import { Concert } from './concert.schema';
import { ConcertService } from './concert.service';

@Controller('concert')
export class concertController {
    constructor(private readonly concertService: ConcertService,) { }

    @Get()
    async getConcerts(): Promise<Concert[]> {
        return await this.concertService.getConcerts();
    }

    @Get(':id')
    async getConcert(@Param('id') id: string): Promise<Concert> {
        return await this.concertService.getConcert(id);
    }

    @Get(':id/tickets')
    async getConcertTickets(@Param('id') id: string) {
        return await this.concertService.getConcertTickets(id);
    }

    @Post()
    async createConcert(@Body() concert: Concert): Promise<Concert> {
        return await this.concertService.createConcert(concert);
    }

    @Put(':id')
    async updateConcert(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
        return await this.concertService.updateConcert(id, concert);
    }

    @Delete(':id')
    async deleteConcert(@Param('id') id: string): Promise<Concert> {
        return await this.concertService.deleteConcert(id);
    }

    @Delete()
    async deleteConcerts() {
        return await this.concertService.deleteConcerts();
    }

}