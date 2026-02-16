import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Movie, MovieResponse } from '../models/movie.model';
import { TicketResponse } from '../models/ticket.model';
import { BookingRequest, SeatMatrixResponse } from '../models/seatmatrix.model';


@Injectable({
    providedIn: 'root'
})
export class MovieService {
    // Matching the base URL of your Auth service
    private apiUrl = `https://localhost:44337/api/v1.0/moviebooking/Movies`;

    constructor(private http: HttpClient) { }

    /**
     * Fetches all movies from the backend
     * Endpoint: GET /api/v1.0/moviebooking/all
     */
    getAllMovies(): Observable<Movie[]> {
        return this.http.get<MovieResponse>(`${this.apiUrl}/getallmovies`).pipe(
            map(response => response.data)
        );
    }

    /**
     * Search for movies by name
     * Endpoint: GET /api/v1.0/moviebooking/movies/search/{movieName}
     */
    searchMovies(movieName: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}/movie-by-name/${movieName}`);
    }

    getSeatMatrix(movieId: number): Observable<SeatMatrixResponse> {
    return this.http.get<SeatMatrixResponse>(`${this.apiUrl}/seats-matrix/${movieId}`);
  }

  bookTickets(bookingData: BookingRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, bookingData);
  }
  
    // movie.service.ts

    /**
     * Fetches all tickets booked by a specific user
     * Endpoint: GET /api/v1.0/moviebooking/getalltickets/{userId}
     */
    getUserTickets(userId: string): Observable<TicketResponse> {
        return this.http.get<TicketResponse>(`${this.apiUrl}/tickets/${userId}`);
    }
}