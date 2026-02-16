import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ticket } from '../core/models/ticket.model';
import { MovieService } from '../core/services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mytickets',
  imports: [CommonModule],
  templateUrl: './mytickets.html',
  styleUrl: './mytickets.css',
})
export class Mytickets implements OnInit {
  tickets: Ticket[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private movieService: MovieService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadUserTickets(userId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Please login to view your tickets.';
    }
  }

  loadUserTickets(userId: string) {
    this.movieService.getUserTickets(userId).subscribe({
      next: (response) => {
        console.log('User tickets loaded:', response);
        
        this.tickets = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Could not fetch tickets. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
