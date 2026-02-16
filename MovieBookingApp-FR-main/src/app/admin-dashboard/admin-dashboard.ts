import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../core/models/movie.model';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  viewMode: 'add' | 'delete' | 'update'| 'none' = 'none';
  movies: Movie[] = [];
  
  // Form Models
  newMovie = { movieName: '', totalTickets: 100, ticketStatus: 'BOOK_ASAP' };
  selectedMovieId: number | null = null;
  isLoading = false;

  constructor(private adminService: AdminService, private movieService: MovieService
    , private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAllMovies().subscribe(res => {
      this.movies = (res as any).data || res;
    });
    this.cdr.detectChanges();
  }

  setMode(mode: 'add' | 'delete'|'update') {
    this.viewMode = mode;
  }

  onAddMovie() {
    this.isLoading = true;
    // Assuming you add an 'addMovie' method to your service
    this.adminService.addMovie(this.newMovie).subscribe({
      next: () => {
        alert('Movie Added Successfully!');
        this.resetForm();
        this.loadMovies();
        this.isLoading = false;
        
      },
      error: () => this.isLoading = false
    });
  }

  onDeleteMovie() {
    if (!this.selectedMovieId) return;
    
    if (confirm('Are you sure you want to delete this movie?')) {
      this.isLoading = true;
      this.adminService.deleteMovie(this.selectedMovieId).subscribe({
        next: () => {
          alert('Movie Deleted!');
          this.selectedMovieId = null;
          this.loadMovies();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  onUpdateMovieStatus(id: number | null): void {

    console.log('Updating movie status for ID:', id);
    
    if (!id) return;

    console.log('Finding movie with ID:', id);
    
    
    // Find current status to toggle it
    const movie = this.movies.find(m => Number(m.movieId) === Number(id));
    console.log('Current movie status:', movie);
    
    if (!movie) return;

    console.log('Toggling status for movie:', movie);
    

    const newStatus = movie.ticketStatus === 'BOOK_ASAP' ? 'SOLD_OUT' : 'BOOK_ASAP';

    if (!confirm(`Switch status to ${newStatus}?`)) return;

    this.isLoading = true;
    const dto = {
      movieId: id,
      ticketStatus: newStatus
    };

    this.adminService.updateTicketStatus(dto).subscribe({
      next: () => {
        alert('Ticket status updated successfully.');
        this.resetForm();
        this.loadMovies();
      },
      error: () => this.isLoading = false
    });
  }

//   resetForm() {
//     this.newMovie = { movieName: '', totalTickets: 100, ticketStatus: 'BOOK_ASAP' };
//     this.selectedMovieId = null;
//     this.selectedMovieIdForUpdate = null;
//     this.viewMode = 'none';
//     this.isLoading = false;
//   }
// }

  resetForm() {
    this.newMovie = { movieName: '', totalTickets: 100, ticketStatus: 'BOOK_ASAP' };
    this.viewMode = 'none';
    this.isLoading = false;
  }
}