import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { ConcertService } from 'libs/concert/src/lib/services/concert.service';

import { Concert } from './concert.schema';

@Controller('concert')
export class ConcertController {
    constructor(private readonly concertService: ConcertService) { }

    @Post()
    async createConcert(@Body() concert: Concert): Promise<any> {
        console.log(concert);
        return null;
    }
}
