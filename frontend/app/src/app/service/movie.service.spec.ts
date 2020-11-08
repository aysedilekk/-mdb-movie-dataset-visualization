import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
   let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        MovieService
      ],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch_movie_count_for_genre as an Observable`, async(inject([HttpTestingController, MovieService],
    (httpClient: HttpTestingController, service: MovieService) => {

      const movieItem = {'Action': 12948, 'Comedy': 29368, 'Fantasy': 3812,
      'Biography': 2377, 'History': 2296, 'Crime': 11067, 'Drama': 47110,
      'Music': 1689, 'Musical': 2041, 'News': 1, 'War': 2242, 'Family': 3962,
      'Romance': 14128, 'Sci-Fi': 3608, 'Thriller': 11388, 'Animation': 2141,
      'Adventure': 7590, 'Western': 1583, 'Mystery': 5225, 'Horror': 9557,
      'Film-Noir': 663, 'Sport': 1064, 'Reality-TV': 3, 'Documentary': 2,
      'Adult': 2}


      service.getMovieCountForGenre()
        .subscribe((movies: any) => {
          expect(Object.keys(movies).length).toBe(25);
        });

      let req = httpMock.expectOne('http://localhost:8000/movie-count-for-genre/');
      expect(req.request.method).toBe("GET");

      req.flush(movieItem);
      httpMock.verify();
    })));
});
