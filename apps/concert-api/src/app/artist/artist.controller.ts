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
import { Artist } from './artist.schema';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService,) { }

    @Get()
    async getArtists(): Promise<Artist[]> {
        return await this.artistService.getArtists();
    }


    @Get(':id')
    async getArtist(@Param('id') id: string): Promise<Artist> {
        return await this.artistService.getArtist(id);
    }

    @Post()
    // @UseGuards(AdminGuard)
    async createArtist(@Body() artist: Artist): Promise<Artist> {
        return await this.artistService.createArtist(artist);
    }

    @Put(':id')
    // @UseGuards(AdminGuard)
    async udpateArtist(@Param('id') id: string, @Body() artist: Artist): Promise<Artist> {
        return await this.artistService.updateArtist(id, artist);
    }

    @Delete(':id')
    // @UseGuards(AdminGuard)
    async deleteArtist(@Param('id') id: string): Promise<Artist> {
        return await this.artistService.deleteArtist(id);
    }

    @Delete()
    @UseGuards(AdminGuard)
    async deleteArtists() {
        return await this.artistService.deleteArtists();
    }

}