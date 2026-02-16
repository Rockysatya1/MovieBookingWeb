import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { SeatMatrixData,BookingRequest } from '../core/models/seatmatrix.model';

@Component({
  selector: 'app-bookmyshow',
  imports: [CommonModule],
  templateUrl: './bookmyshow.html',
  styleUrls: ['./bookmyshow.css'],
})
export class Bookmyshow  implements OnInit {

  movieId!: number;
  movieData?: SeatMatrixData;
  selectedSeats: string[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Movie ID from the URL (e.g., /book/5)
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.loadSeatMatrix();
    }
  }

  loadSeatMatrix() {
    this.isLoading = true;
    console.log('Loading seat matrix for movie ID:', this.movieId);
    this.movieService.getSeatMatrix(this.movieId).subscribe({
      next: (res) => {
        console.log('Seat Matrix Data:', res);
        
        if (res.status === 1) {
          this.movieData = res.data;
        }
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensure UI updates immediately
      },
      error: (err) => {
        console.error('Error loading seats', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleSeat(seat: string) {
    if (this.isBooked(seat)) return;

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isBooked(seat: string): boolean {
    return this.movieData?.bookedSeatNumbers.includes(seat) ?? false;
  }

  isSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  confirmBooking() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const userIdStr = localStorage.getItem('userId');
    const userId: number | null = userIdStr ? Number(userIdStr) : null;
    if (userId === null) {
      alert('Please login to book tickets.');
      this.router.navigate(['/login']);
      return;
    }

    this.isSubmitting = true;

    const payload: BookingRequest = {
      movieId: this.movieId,
      userId: userId,
      seatNumbers: this.selectedSeats,
      //numberOfTickets: this.selectedSeats.length
    };

    this.movieService.bookTickets(payload).subscribe({
      next: (res: any) => {
        alert('Booking Successful!');
        this.router.navigate(['/view-tickets']);
      },
      error: (err:any) => {
        alert('Booking failed: ' + (err.error?.message || 'Server error'));
        this.isSubmitting = false;
      }
    });
  }

}
