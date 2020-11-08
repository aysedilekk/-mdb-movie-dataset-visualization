import { Component, OnInit } from '@angular/core';

import { MovieService } from '../service/movie.service'
import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(
    public movieService: MovieService,
    public authService: AuthService,
  ) { }

  logout() {
    this.authService.doLogout();
  }

  isDataAvailable: boolean = false;

  movie_count_by_genre: any ;
  movie_count_by_year: any;
  most_voted_movies: any;
  review_count_for_random_movies: any;
  getMovieCountForGenre() {
    this.movieService.getMovieCountForGenre().subscribe((res) => {
      if (res) {
        this.movie_count_by_genre = res
        this.getMovieCountForYear()
      }
    })
  }

  getMovieCountForYear() {
    this.movieService.getMovieCountForYear().subscribe((res) => {
      if (res) {
        this.movie_count_by_year = res
        this.getMostVoted50Movies()
      }
    })
  }

  getMostVoted50Movies() {
    this.movieService.getMostVoted50Movies().subscribe((res) => {
      if (res) {
        this.most_voted_movies = res
        this.getReviewCountForRandomMovies()
      }
    })
  }

  getReviewCountForRandomMovies() {
    this.movieService.getReviewCountForRandomMovies().subscribe((res) => {
      if (res) {
        this.review_count_for_random_movies = res

        // chart data is avalilable
        this.isDataAvailable = true
        this.chartFilled();
      }
    })
  }

  public barChartLabel: string[] = [];
  barChartData: any;
  barChartOptions: any;

  public lineChartLabel: string[] = [];
  lineChartData: any;
  lineChartOptions: any;

  public barChartLabel2: string[] = [];
  barChartData2: any;
  barChartOptions2: any;

  public lineChartLabel2: string[] = [];
  lineChartData2: any;
  lineChartOptions2: any;

  chartFilled() {

    this.barChartLabel = Object.keys(this.movie_count_by_genre);
    this.barChartData = [
      {
        data: Object.values(this.movie_count_by_genre),
        label: 'Movie Count',
        backgroundColor: 'rgba(6, 0, 150, 0.7)',
        hoverBackgroundColor: 'rgba(6, 0, 150, 1)'
      },
    ];

    this.lineChartLabel = Object.keys(this.movie_count_by_year);
    this.lineChartData = [
      {
        data: Object.values(this.movie_count_by_year),
        label: 'Movie Count',
        borderColor: 'rgba(240, 115, 0)',
        backgroundColor: 'rgba(240, 115, 0, 0.5)',
        hoverBackgroundColor: 'rgba(240, 115, 0, 1)',
        pointBackgroundColor: 'rgba(6, 0, 150)',

      },
    ];

    this.barChartLabel2 = Object.keys(this.most_voted_movies);
    this.barChartData2 = [
      {
        data: Object.values(this.most_voted_movies),
        label: 'Vote Count',
        backgroundColor: 'rgba(190, 0, 145, 0.7)',
        hoverBackgroundColor: 'rgba(190, 0, 145, 1)'
      },
    ];

    this.lineChartLabel2 = Object.keys(this.review_count_for_random_movies[0]);
    this.lineChartData2 = [
          {
            data: Object.values(this.review_count_for_random_movies[0]),
            label: 'Review Count From Users',
            borderColor: 'rgba(0, 80, 142)',
            pointBackgroundColor: 'rgba(50, 80, 142)',
            fill: false
          },
          {
            data: Object.values(this.review_count_for_random_movies[1]),
            label: 'Review Count From Critics',
            borderColor: 'rgba(236, 185, 0)',
            pointBackgroundColor: 'rgba(236, 185, 50)',
            fill: false
          }
        ]

    this.barChartOptions = this.getChartOptions()

    this.lineChartOptions = this.getChartOptions()
    this.lineChartOptions['scales']['xAxes'][0]['scaleLabel']['labelString'] = "Year"

    this.barChartOptions2 = this.getChartOptions()
    this.barChartOptions2['scales']['xAxes'][0]['scaleLabel']['labelString'] = "Title"
    this.barChartOptions2['scales']['yAxes'][0]['scaleLabel']['labelString'] = "Votes"

    this.lineChartOptions2 = this.getChartOptions()
    this.lineChartOptions2['scales']['xAxes'][0]['scaleLabel']['labelString'] = "Title"
    this.lineChartOptions2['scales']['yAxes'][0]['scaleLabel']['labelString'] = "Review Count"
  }

  ngOnInit() {
    this.getMovieCountForGenre();
  }

  getChartOptions() {
    return {

      tooltips: {
        display: true,
        backgroundColor: '#fff',
        titleFontSize: 14,
        titleFontColor: 'chocolate',
        bodyFontColor: '#000',
        bodyFontSize: 12,
        displayColors: false,
      },

      animation: {
        duration: 1000,
        easing: "easeInOutQuad"
      },

      responsive: true,

      legend: {
        display: true,
        position: 'top',
        cornerRadius: 10,
        titleSpacing: 4,
        footerFontStyle: 'bold',
        multiKeyBackground: '#eee'
      },

      hover: {
        mode: 'nearest',
        intersect: true,
      },

      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Genre',
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Movie Count"
          },
        }]
      }
    }
  }

}
