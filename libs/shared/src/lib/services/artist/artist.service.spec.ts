import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArtistService } from './artist.service';
import { IArtist } from '../../models/artist.model';
import { environment } from '@angular-concert-project/util-env';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch artists via GET', () => {
    const mockArtists: IArtist[] = [
      {
        id: '1',
        name: 'Artist 1',
        genre: 'Pop',
        birthday: new Date('1990-01-01'),
        country: 'USA',
        image: 'artist1.jpg'
      },
      {
        id: '2',
        name: 'Artist 2',
        genre: 'Rock',
        birthday: new Date('1985-06-15'),
        country: 'UK',
        image: 'artist2.jpg'
      }
    ];

    service.getArtists().subscribe(artists => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(`${environment.dataApiUrl}/data/artist`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });

  it('should fetch a single artist via GET', () => {
    const mockArtist: IArtist = {
      id: '1',
      name: 'Artist 1',
      genre: 'Pop',
      birthday: new Date('1990-01-01'),
      country: 'USA',
      image: 'artist1.jpg'
    };

    service.getArtistById('1').subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.dataApiUrl}/data/artist/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  });

  it('should delete an artist via DELETE', () => {
    const mockArtist: IArtist = {
      id: '1',
      name: 'Artist 1',
      genre: 'Pop',
      birthday: new Date('1990-01-01'),
      country: 'USA',
      image: 'artist1.jpg'
    };

    service.deleteArtist('1').subscribe(artist => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${environment.dataApiUrl}/data/artist/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockArtist);
  });

  it('should add a new artist via POST', () => {
    const newArtist: IArtist = {
      id: '3',
      name: 'Artist 3',
      genre: 'Jazz',
      birthday: new Date('1995-11-22'),
      country: 'Canada',
      image: 'artist3.jpg'
    };

    service.addArtist(newArtist).subscribe(artist => {
      expect(artist).toEqual(newArtist);
    });

    const req = httpMock.expectOne(`${environment.dataApiUrl}/data/artist`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArtist);
    req.flush(newArtist);
  });

  it('should update an artist via PUT', () => {
    const updatedArtist: IArtist = {
      id: '1',
      name: 'Updated Artist 1',
      genre: 'Hip-Hop',
      birthday: new Date('1990-01-01'),
      country: 'USA',
      image: 'updated_artist1.jpg'
    };

    service.udpateArtist(updatedArtist, '1').subscribe(artist => {
      expect(artist).toEqual(updatedArtist);
    });

    const req = httpMock.expectOne(`${environment.dataApiUrl}/data/artist/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedArtist);
    req.flush(updatedArtist);
  });
});
