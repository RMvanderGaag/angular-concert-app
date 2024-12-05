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
import { Concert } from './concert.schema';
import { ConcertService } from './concert.service';

@Controller('concert')
export class concertController {
    constructor(private readonly concertService: ConcertService,) { }

    @Get()
    async getConcerts(): Promise<Concert[]> {
        return await this.concertService.getConcerts();
    }

    // @Get('neo/recommended')
    // async getRecommendedConcerts(@InjectToken() token: Token): Promise<Concert[]> {
    //     console.log(token);
    //     return await this.concertService.getRecommendedConcerts(token.id);
    // }


    @Get(':id')
    async getConcert(@Param('id') id: string): Promise<Concert> {
        return await this.concertService.getConcert(id);
    }

    @Post()
    // @UseGuards(AdminGuard)
    async createConcert(@Body() concert: Concert): Promise<Concert> {
        return await this.concertService.createConcert(concert);
    }

    @Put(':id')
    // @UseGuards(AdminGuard)
    async updateConcert(@Param('id') id: string, @Body() concert: Concert): Promise<Concert> {
        return await this.concertService.updateConcert(id, concert);
    }

    @Delete(':id')
    // @UseGuards(AdminGuard)
    async deleteConcert(@Param('id') id: string): Promise<Concert> {
        return await this.concertService.deleteConcert(id);
    }

    @Delete()
    @UseGuards(AdminGuard)
    async deleteConcerts() {
        return await this.concertService.deleteConcerts();
    }

}