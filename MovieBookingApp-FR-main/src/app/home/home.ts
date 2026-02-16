import { LoginService } from './../core/services/login.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../core/services/movie.service'; // Adjust path
import { Movie } from '../core/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchText = '';
  movies: Movie[] = [];
  isLoading = false;

  constructor(private movieService: MovieService, private loginService: LoginService
    , private cdr: ChangeDetectorRef,private router: Router,
  ) { }

  // 1. Fetch movies when the component starts
  ngOnInit(): void {
    this.fetchMovies();
  }

  // home.ts
  fetchMovies() {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe({
      next: (response: Movie[]) => {
        // If the service returns Movie[] directly, assign it to movies
        console.log('Movies loaded:', response);
        console.log('login status:', this.loginService.loginStatus());

        this.movies = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Called when the Search button is clicked
  onSearch() {
    this.isLoading = true;
    this.movieService.searchMovies(this.searchText).subscribe({
      next: (response: any) => {
        // We update the 'movies' array directly with the search results
        this.movies = response.data || response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Search failed', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredMovies() {
    return this.movies.filter(movie =>
      movie.movieName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Inside your component class
clearSearch() {
  this.searchText = '';
  this.fetchMovies(); // Reload the full list
}

// // Ensure updateSearch also updates the local searchText variable
// updateSearch(event: any) {
//   this.searchText = event.target.value;
// }

  // 3. Update search text from input event
  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }

  bookMovie(movieId: number) {
    const movie = this.movies.find(m => m.movieId === movieId);
    if (!movie || movie.ticketStatus === 'SOLD OUT') return;
    console.log('Booking movie:', movie.movieName);
    this.router.navigateByUrl(`/seat-matrix/${movieId}`);
    // You can navigate to a booking page here:
    // this.router.navigate(['/book', movie.movieName]);
  }
}